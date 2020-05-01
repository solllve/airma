


figma.showUI(__html__)
figma.ui.resize(450, 350)

figma.ui.onmessage = (res) => {

  let airtableObject = res
  console.log(airtableObject)
  const airtablePage = figma.createPage()
  airtablePage.name = 'Personas'
  airtablePage
}




//console.log(this)
//figma.createRectangle();
//figma.ui.postMessage('this is a test')
