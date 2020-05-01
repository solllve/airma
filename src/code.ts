
figma.showUI(__html__)
figma.ui.resize(450, 350)


figma.ui.onmessage = (res) => {
  //airtable object
  let airtableObject = res

  //map airtable array
  //const sweeterArray = airtableObject.map(tableRow => {
  //    return tableRow.
  //});

  //text object
  console.log(airtableObject)

  //figma.createPage().name = 'Airtable Data'
  //text node
  //const textNode = figma.createText()
  //textNode.characters = "a string"
  //textNode
  //create figma Component

  const component = figma.createComponent()
  component.resizeWithoutConstraints(300, 100)

}






//console.log(this)
//figma.createRectangle();
//figma.ui.postMessage('this is a test')
