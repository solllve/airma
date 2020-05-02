figma.showUI(__html__)
figma.ui.resize(450, 350)
figma.loadFontAsync({ family: "Roboto", style: "Regular" })

//Use this to grab properties of any object in figma!
for (const node of figma.currentPage.selection) {
  console.log(node)
}


figma.ui.onmessage = (res) => {
  //airtable object
  const airtableObject = res
  //return map of nodes
  let airtableNumberOfResults = Object.keys(res[0]).length

  airtableObject.map(tableRow => {

    let arrayOfValues = Object.values(tableRow)
    let arrayOfKeys = Object.keys(tableRow)

    //loop values of results
    for(var i = 0; i < airtableNumberOfResults; ++i){

      //if string
      if(arrayOfValues[i] !== undefined) {
        console.log(arrayOfValues[i])
        //let textNode = figma.createText()
        //textNode.characters = arrayOfValues[i].toString()
        //textNode
      }

      //if image
      if(arrayOfValues[i][0].filename !== undefined) {
        //console.log(arrayOfValues[i][0].thumbnails.large.url)
        let imageUrl = arrayOfValues[i][0].thumbnails.large.url
        //var arr = new Uint8Array([21,31]);
        //Hey this works!
        let shapeNode = figma.createEllipse()
        shapeNode.fills = [
          {
            blendMode: "NORMAL",
            imageHash: "27f652802e903b9feac63df214e3cc2d369db90f",
            opacity: 1,
            scaleMode: "FILL",
            scalingFactor: 0.5,
            type: "IMAGE",
            visible: true
          }
        ]

        //imageNode.fill = [
        //  {
        //    type: 'IMAGE',
        //    scaleMode: "FILL",
        //    imageHash: imageUrl.toString()
            //color: {
            //  r: 1,
            //  g: 0.5,
            //  b: 0
            //},
            //background:{
            //  data: imageUrl.toString()
            //}
        //  }
        //]
        //console.log(imageNode)
        //console.log(imagePaintNode)
        //shapeNode
      }
      //let textNode = figma.createText()
      //textNode.characters = arrayOfValues[i].toString()
      //textNode
    }

    //text node

    //console.log(i)
    //console.log(Object.keys(tableRow).length)
    //console.log(Object.keys(tableRow))

  });

  //figma.createPage().name = 'Airtable Data'

  //text node
  //const textNode = figma.createText()
  //textNode.characters = "a string"
  //textNode
  //create figma Component

  //const component = figma.createComponent()
  //component.resizeWithoutConstraints(300, 100)
  //const selectedPage = figma.currentPage.selection[0]
}








//console.log(this)
//figma.createRectangle();
//figma.ui.postMessage('this is a test')
