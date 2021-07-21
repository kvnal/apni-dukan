
const video = document.getElementById('videoID')
const imageUploaded = document.querySelector('#image')
const canvas = document.querySelector('#canvas') //ss
const canvas2 = document.querySelector('#canvas2') // face recogn
const webcam = new Webcam(video, 'user', canvas);
const progress = document.querySelector("#progress")
const status = document.querySelector("#status")
const click =document.querySelector("#click")
const adhaarId =document.querySelector("#adhaarId")

// Promise.all([
//     faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//     faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//     faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//     faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
// ]).then(startWebcam)


var image__ = new Image()

function startWebcam(){
    imageUploaded.disabled=false    
    imageUploaded.addEventListener('change',event=>{ 
        var reader_ = new FileReader()
        reader_.addEventListener("load",(e)=>{
            image__.src=e.target.result
        })
        reader_.readAsDataURL(imageUploaded.files[0])
       webcam.start().then(result =>{
            console.log("webcam started");
            
          })
          .catch(err => {
            console.log(err);
        });

        progress.value=20
        status.innerHTML="Status : Adhaar Uploaded"
        status.style.color="#F49454"
        click.disabled=false
        click.style.display='inline'
        
    })
    
    

}

startWebcam()
function takepicture(){
    progress.value=30
    status.innerHTML="Status : Uploading"
    status.style.color="#FFCA4C"
    click.style.display='none'

    let pic = webcam.snap();
    const i = new Image()
    i.src=pic
    webcam.stop()
    // console.log(p)
    canvas.remove()
    // canvas.removeAttribute('height')
    // canvas.removeAttribute('width')
    
    return adhaar(image__)
}

function adhaar(_image){
        progress.value=90
        status.innerHTML="Status : Verifying Adhaar details"
        status.style.color="#FFBE04"
    //adhaar detection
    // const data =URL.createObjectURL(img.files[0])
    const data=_image
    Tesseract.recognize(
        data,
        'eng',
        { logger: m => {}}//console.log(m) }
    ).then(({ data: { text } }) => {
        console.log(text);
        return text;
    }).then(text=>{

        var regex = /[0-9]{4} [0-9]{4} [0-9]{4}/ ;
        var adhaarno = text.match(regex);
        console.log(adhaarno[0])
        // document.querySelector('#title').innerHTML="Verified!"
        progress.value=100
        status.innerHTML="Status: Verified!"
        adhaarId.style.display='inline'
        adhaarId.innerHTML=adhaarno[0]
        status.style.color="#00DE7A"

    }).catch(err=>
        console.log("OCR "+err))

}

// async function test(_pic){
//     progress.value=40
//     status.innerHTML="Status : Verification #1"

//     const image = await faceapi.bufferToImage(imageUploaded.files[0])
//     // document.body.append(image)
//     const displaySize = { width: image.width, height: image.height }
//     const detect = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
//     console.log("detect scan "+detect)
//     // const ss=faceapi.bufferToImage(_pic)
//     const detect_ss = await faceapi.detectAllFaces(_pic).withFaceLandmarks().withFaceDescriptors()
//     console.log("detect ss"+detect_ss)
//     progress.value=50


//     try{
//     const faceMatcher = new faceapi.FaceMatcher(detect, 0.6)
//     const resizedDetections = faceapi.resizeResults(detect_ss, displaySize)
//     const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
//     console.log(results[0])
//     console.log(results[0]['_label'])
//     if(results[0]['_label']==="person 1"){
//         progress.value=70
//         status.innerHTML="Status : Subject Matched!"
//         status.style.color="#00DE7A"
//         // document.querySelector('#title').innerHTML="Adhaar verification (50%)"
//         console.log("adhaar detect...")
//         return adhaar(image);
//         return console.log("verified!")
//     }
//     else{
//         progress.value=0
//         status.innerHTML="Status : Retry"
//         status.style.color="red"
//         webcam.start()
//         click.disabled=false
//         click.style.display='inline'
//     }

//     }
//     catch(err){
//         progress.value=0
//         status.innerHTML="Status : Retry"
//         status.style.color="red"
//         webcam.start()
//         click.disabled=false
//         click.style.display='inline'
//         console.log('try again '+err)
//     }
//     // const a = faceMatcher.findBestMatch(detect_ss)
//     // console.log(a)

//     // const resizedDetections = faceapi.resizeResults(detect, displaySize)
//     // .withFaceLandmarks().withFaceDescriptors()
//     // resizedDetections.forEach(detection => {
//     //     const box = detection.box
//     //     const drawBox = new faceapi.draw.DrawBox(box, { label: 'ok' })
//     //     drawBox.draw(canvas2)
//     // })
// }