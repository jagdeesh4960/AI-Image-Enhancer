import React, { useState } from 'react';
import ImageUploading from './ImageUploading';
import ImagePreview from './ImagePreview';
import { enhancedImageAPI } from '../utils/enhanceImageApi';

const Home = () => {

    const [uploadImage, setUploadImage] = useState(null);
    const [enhancedImage, setenhancedImage] = useState(null);
    const [loading, Setloading] = useState(false);

    const UploadImageHandler= async (file)=>{
         setUploadImage(URL.createObjectURL(file));
         Setloading(true);
         try {
            const enhancedURL= await enhancedImageAPI(file);
            setenhancedImage(enhancedURL);
            Setloading(false);
         } catch (error) {
            console.log(error);
            alert("An error occurred while uploading the image. Please try again.")
            
         }

    }

    return (
        <>
      
            <ImageUploading
            UploadImageHandler={UploadImageHandler}
            />

            <ImagePreview
            loading={loading}
            uploadImage={uploadImage}
            enhancedImage={enhancedImage?.image} 
            />
        </>
    );
};

export default Home;