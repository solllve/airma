
//figma preliminaries
figma.showUI(__html__)
figma.ui.resize(439, 300)
figma.loadFontAsync({ family: "Roboto", style: "Regular" })
const CIP = require('canvas_image_processing');

//Use this to grab properties of any object in figma!
for (const node of figma.currentPage.selection) {
  console.log(node)
}

figma.ui.onmessage = msg => {
  if (msg.type === 'close-plugin') {
    figma.closePlugin()
  }
  if (msg.type === 'successful-message') {
    figma.notify('✌️ Data has been successfully loaded!')
  }
  if (msg.type === 'fail-message') {
    figma.notify('😅 Please double check your API credentials at airtable.com/api', {timeout: 800})
  }
  if (msg.type === 'airtable') {

    //create new figma Page
    figma.createPage().name = msg.tableName

    //Navigate to airtable data page
    figma.currentPage = figma.root.children.slice(-1).pop() as PageNode

    //data array
    let arrayOfTableResults = [];
    //airtable object
    const airtableObject = JSON.parse(msg.message)

    arrayOfTableResults.push(airtableObject.records)

    //console.log(airtableObject.records)

    let numberOfFields = Object.keys(arrayOfTableResults[0][0]['fields']).length

      arrayOfTableResults.map(tableRow => {
          console.log(tableRow)
          //give me loop of rows
          for(var i = 0; i < tableRow.length; ++i){

            let arrayOfValues = Object.values(tableRow[i].fields)
            let arrayOfKeys = Object.keys(tableRow[i].fields)
            let arrayOfJson = Object.values(tableRow[i])

            const frame = figma.createFrame()

            //give me loop of fields
            for(var l = 0; l < numberOfFields; ++l){

              let textNode = figma.createText()
              const frameWidth = 200 * Number(numberOfFields)
              const frameHeight = 100

              //Come back to figure out responsive width with padding
              frame.resizeWithoutConstraints(frameWidth, frameHeight)

              frame.appendChild(textNode)
              frame.y = i * 100
              textNode.y = 30
              textNode.x = l * 200
              textNode.resize(150, 30)


              if(arrayOfKeys[l] == 'attachment') {
                //Come back to add actual image inside Circle shape
                textNode.characters = JSON.stringify(tableRow[i].fields.image[0].url)
              }
              if(arrayOfKeys[l] == 'url') {
                //Come back to add actual image inside Circle shape
                textNode.characters = JSON.stringify(tableRow[i].fields.url[0].url)
              }
              else {
                textNode.characters = arrayOfValues[l].toString()
              }


            }

          }
      });
    }
  }
      //loop values of results
//      for(var i = 0; i < airtableNumberOfResults; ++i){

        //if image
//        if(arrayOfValues[i][0].filename !== undefined) {
          //console.log(arrayOfValues[i][0].thumbnails.large.url)
//          let imageUrl = arrayOfValues[i][0].thumbnails.large.url
          //var arr = new Uint8Array([21,31]);
          //Hey this works!
          //let shapeNode = figma.createEllipse()
          //shapeNode.fills = [
          //  {
          //    blendMode: "NORMAL",
          //    imageHash: "27f652802e903b9feac63df214e3cc2d369db90f",
          //    opacity: 1,
          //    scaleMode: "FILL",
          //    scalingFactor: 0.5,
          //    type: "IMAGE",
          //    visible: true
          //  }
          //]

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
//        }
        //let textNode = figma.createText()
        //textNode.characters = arrayOfValues[i].toString()
        //textNode
//      }

      //text node

//    });



    //text node
    //const textNode = figma.createText()
    //textNode.characters = "a string"
    //textNode
    //create figma Component

    //const component = figma.createComponent()
    //component.resizeWithoutConstraints(300, 100)
    //const selectedPage = figma.currentPage.selection[0]


//  }
//}

//img test
//console.log(this)
//figma.createRectangle();
//figma.ui.postMessage('this is a test')
