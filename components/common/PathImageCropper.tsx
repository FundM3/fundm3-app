// ImageCropper.tsx
import React, { useEffect, useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Modal from "react-modal";
import { Button } from "@/components/ui/button";

interface ImageCropperProps {
  onCropComplete: (file: File, id: string) => void;
  aspectRatio: number;
  id: string;
}

const MAX_SIZE = 900;
const MIN_SIZE = 300;

const ImageCropper: React.FC<ImageCropperProps> = ({
  onCropComplete,
  aspectRatio,
  id,
}) => {
  const [projectImage, setProjectImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [containerSize, setContainerSize] = useState({
    width: 800,
    height: 800,
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setProjectImage(imageUrl);
      setIsModalOpen(true);

      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        let { width, height } = img;

        // 根據最大和最小值限制調整圖片尺寸
        if (width > MAX_SIZE || height > MAX_SIZE) {
          const scale = Math.min(MAX_SIZE / width, MAX_SIZE / height);
          width *= scale;
          height *= scale;
        } else if (width < MIN_SIZE || height < MIN_SIZE) {
          const scale = Math.max(MIN_SIZE / width, MIN_SIZE / height);
          width *= scale;
          height *= scale;
        }

        setContainerSize({ width, height });
      };
    }
  };

  const onCropAreaComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: any
  ): Promise<Blob> => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Failed to get canvas context");

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Canvas is empty"));
        }
      }, "image/jpeg");
    });
  };

  const confirmCrop = useCallback(async () => {
    if (projectImage && croppedAreaPixels) {
      try {
        const croppedBlob = await getCroppedImg(
          projectImage,
          croppedAreaPixels
        );
        const file = new File([croppedBlob], "cropped-image.jpg", {
          type: "image/jpeg",
        });
        onCropComplete(file, id);
      } catch (error) {
        console.error("Error cropping image:", error);
      }
    }
    setIsModalOpen(false);
  }, [croppedAreaPixels, onCropComplete, projectImage, id]);

  const cancelCrop = () => {
    setIsModalOpen(false);
    setProjectImage(null);
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id={`uploadImage-${id}`}
      />
      <label
        htmlFor={`uploadImage-${id}`}
        className="text-gray-400 cursor-pointer text-center"
      >
        Upload & Browse
      </label>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={cancelCrop}
        contentLabel="Crop Image"
        ariaHideApp={false}
        className="relative bg-white p-5 rounded-lg overflow-auto"
      >
        <div className={"crop-container"}>
          <Cropper
            image={projectImage || ""}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropAreaComplete}
            style={{
              containerStyle: {
                position: "fixed",
                zIndex: 1,
                margin: "auto auto",
                width: `${containerSize.width}px`,
                height: `${containerSize.height}px`,
                // width: "auto",
                // height: "60%",
                borderRadius: 10,
                overflow: "hidden",
              },
            }}
          />
        </div>
        <div className="button-container">
          <Button
            type="button"
            onClick={confirmCrop}
            className="confirm-button z-50"
          >
            Confirm
          </Button>
          <Button
            type="button"
            onClick={cancelCrop}
            className="cancel-button z-50"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ImageCropper;
