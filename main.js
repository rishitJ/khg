function preload() 
{
    classifier = ml5.imageClassifier('DoodleNet')
}
function setup()
{
    canvas = createCanvas(450, 350)
    canvas.position(550, 250)
    background("white")
    canvas.mouseReleased(classifyCanvas)
    synth = window.SpeechSynthesis
}
function draw()
{
    strokeWeight(5)
    stroke("red")
    if (mouseIsPressed) 
    {
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
}
function clr_canvas()
{
    background("white")
}
function classifyCanvas()
{
    classifier.classify(canvas, gotResult)
}
function gotResult(error, result) 
{
    if (error) 
    {
        console.error(error)
    } 
    else
    {
        console.log(result)
        document.getElementById("label").innerHTML = result[0].label
        document.getElementById("confidence").innerHTML = Math.round(result[0].confidence*100) + '%'
        utterThis = new SpeechSynthesisUtterance(result[0].label)
        synth.speak(utterThis)
    }
}