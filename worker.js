self.importScripts("vision_bundle.js?a=10");

let faceLandmarker = null;
let holisticLandmarker = null;
let defaultFLMConfig = {
    baseOptions: {
        modelAssetPath: "face_landmarker.task",
        delegate: "GPU"
    },
    outputFaceBlendshapes: true,
    runningMode: "IMAGE",
    numFaces: 1
};
let defaultHLMConfig = {
    baseOptions: {
        modelAssetPath: "holistic_landmarker.task",
        delegate: "GPU"
    },
    outputFaceBlendshapes: true,
    runningMode: "IMAGE",
    numFaces: 1
};
async function initFaceLandmarker() {
    const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.10/wasm"
    );
    faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, defaultFLMConfig);
}
async function initHolisticLandmarker() {
    const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.12/wasm"
    );
    holisticLandmarker = await HolisticLandmarker.createFromOptions(filesetResolver, defaultHLMConfig);
}

onmessage = async e => {
    if(faceLandmarker == null){
        await initFaceLandmarker();
    }
    if(faceLandmarker !== null && e.data){
        let results = await faceLandmarker.detect(e.data);
        postMessage(results);
    }
}