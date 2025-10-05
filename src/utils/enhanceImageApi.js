import axios from "axios";

export const enhancedImageAPI = async (file) => {
    try {
        const tasktId = await uploadImage(file);
        const enhancedImageData = await PollEnhancedImage(tasktId);
        return enhancedImageData;
    } catch (error) {
        console.log("Error ehanching image : ", error.message);
    }
}

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image_file", file);
    const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/tasks/visual/scale`,
        formData,
        {
            headers: {
                "Contend-Type": "multipart/form-data",
                "X-API-KEY": import.meta.env.VITE_IMAGE_ENHANCER_API_KEY,
            },
        }
    );

    if (!data?.data?.task_id) {
        throw new Error("Failed to upload image! Task Id not found.");
    }
    return data.data.task_id;
}

const fetchEnhancedImage = async (taskId) => {
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/tasks/visual/scale/${taskId}`,
        {
            headers: {
                "X-API-KEY": import.meta.env.VITE_IMAGE_ENHANCER_API_KEY,
            },
        }
    );

    if (!data?.data) {
        throw new Error("Failed to fetch enhanced image! Image not found.");
    }
    return data.data;

}

const PollEnhancedImage = async (taskId , retries = 0 ) => {
    const result = await fetchEnhancedImage(taskId);
    if(result.state === 4){
        console.log("Processing...");
        if(retries >= 20){
            throw new Error("Max retries reaced! Please try again later.");
        }
        await new Promise((resolve)=>setTimeout(resolve,2000));
        return PollEnhancedImage(taskId, retries + 1);
    }
    return result;
}