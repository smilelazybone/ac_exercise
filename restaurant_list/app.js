//require packages used in the project
const express = require(`express`)
const app = express()
const port = 3000

//require express-handlebars 
const exphbs = require(`express-handlebars`)
const restaurantList = require(`./restaurant.json`)

//setting engin
app.engine(`handlebars`, exphbs({ defaultLayout: `main` }))
app.set(`view engine`, `handlebars`)

//setting static files
app.use(express.static(`public`))

//render restaurant list
app.get(`/`, (req, res) => {
  res.render(`index`, { restaurants: restaurantList.results })
})

//show restaurant info
app.get(`/restaurants/:restaurant_id`, (req, res) => {
  const restaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render(`show`, { restaurant: restaurant })
})

//search 
app.get(`/search`, (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(
    restaurant => {
      return ((restaurant.name.toLowerCase().includes(keyword.toLowerCase().trim())) ||
        (restaurant.category.toLowerCase().includes(keyword.toLowerCase().trim())))
    })
  res.render(`index`, { restaurants: restaurants, keyword: keyword })
})

//start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)

})