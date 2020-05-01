
figma.showUI(__html__)
figma.ui.resize(450, 350)

figma.loadFontAsync({ family: "Roboto", style: "Regular" })

figma.ui.onmessage = (res) => {
  //airtable object
  const airtableObject = res

  //return map of nodes
  airtableObject.map(tableRow => {
    let arrayOfKeys = Object.keys(tableRow)
    let arrayOfValues = Object.values(tableRow)
      //text node

    let textNode = figma.createText()

    textNode.characters = tableRow.age
    textNode

    console.log(arrayOfValues)

  });

  //text object


  //figma.createPage().name = 'Airtable Data'
  //text node
  //const textNode = figma.createText()
  //textNode.characters = "a string"
  //textNode
  //create figma Component

  //const component = figma.createComponent()
  //component.resizeWithoutConstraints(300, 100)

}






//console.log(this)
//figma.createRectangle();
//figma.ui.postMessage('this is a test')
