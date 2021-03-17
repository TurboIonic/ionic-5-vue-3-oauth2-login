import { ref, onMounted, watch } from 'vue';
import { Plugins, CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory } from "@capacitor/core";
import { isPlatform } from '@ionic/vue';
import {Photo} from "@/contracts/interface";
import {useStore} from "vuex";

export function usePhotoGallery() {
    const { Camera, Filesystem, Storage } = Plugins;
    const photos = ref<Photo[]>([]);
    const PHOTO_STORAGE = "photos";
    const store = useStore();
    const loadSaved = async () => {
        const photoList = await Storage.get({ key: PHOTO_STORAGE });
        const photosInStorage = photoList.value ? JSON.parse(photoList.value) : [];

        // If running on the web...
        if (!isPlatform('hybrid')) {
            for (const photo of photosInStorage) {
                const file = await Filesystem.readFile({
                    path: photo.filepath,
                    directory: FilesystemDirectory.Data
                });
                // Web platform only: Load the photo as base64 data
                photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
            }
        }

        photos.value = photosInStorage;
    }

    const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });

    const savePicture = async (photo: CameraPhoto, fileName: string): Promise<Photo> => {
        let base64Data: string;
        // "hybrid" will detect Cordova or Capacitor;
        if (isPlatform('hybrid')) {
          const file = await Filesystem.readFile({
            path: photo.path!
          });
          base64Data = file.data;
        } else {
            // Fetch the photo, read as a blob, then convert to base64 format
            const response = await fetch(photo.webPath!);
            const blob = await response.blob();
            base64Data = await convertBlobToBase64(blob) as string;
        }
        const savedFile = await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: FilesystemDirectory.Data
        });

        if (isPlatform('hybrid')) {
          // Display the new image by rewriting the 'file://' path to HTTP
          // Details: https://ionicframework.com/docs/building/webview#file-protocol
          return {
            filepath: savedFile.uri,
            webviewPath: Capacitor.convertFileSrc(savedFile.uri),
          };
        }
        else {
          // Use webPath to display the new image instead of base64 since it's
          // already loaded into memory
          return {
            filepath: fileName,
            webviewPath: photo.webPath
          };
        }
      };
    const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays: Uint8Array[] = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
    const takePhoto = async (type: CameraSource) => {
        const image = await Camera.getPhoto({
            resultType: CameraResultType.Base64,
            source: type,
            quality: 60,
        });
        const blobData = b64toBlob(image.base64String, `image/${image.format}`);
        const fileName = new Date().getTime() + '.jpeg';
        store.dispatch('home/uploadImage', {
            blobData,
            imageName: fileName,
            ext: image.format
        }).then((value) => {
            photos.value = [{webviewPath: `http://${value.data}`, filepath: fileName}, ...photos.value];
        })
        // const savedFileImage = await savePicture(cameraPhoto, fileName);
        // photos.value = [{webviewPath: blobData, filepath: fileName}, ...photos.value];
    };

    const deletePhoto = async (photo: Photo) => {
      // Remove this photo from the Photos reference data array
      photos.value = photos.value.filter(p => p.filepath !== photo.filepath);

      // delete photo file from filesystem
      const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
      await Filesystem.deleteFile({
        path: filename,
        directory: FilesystemDirectory.Data
      });
    };

    const cachePhotos = () => {
      Storage.set({
        key: PHOTO_STORAGE,
        value: JSON.stringify(photos.value)
      });
    }

    // onMounted(loadSaved);

    // watch(photos, cachePhotos);

    return {
        photos,
        takePhoto,
        deletePhoto
    }
}
