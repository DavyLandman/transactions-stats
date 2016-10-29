
library(ggplot2)
library(shiny)
library("shinyURL")

#ggplot(dt2, aes(x=main.category, y=amount)) + geom_bar(stat='sum') + facet_grid(.~month) + theme(axis.text.x = element_text(angle = 90, hjust =0))

mainCategories = levels(subset(read.csv("maindata.csv"))$main.category)
mainCategories = mainCategories[mainCategories != "Geldbeheer"]

# Define UI for application that draws a histogram
ui <- shinyUI(fluidPage(
    titlePanel("Zoom into expenses"),
    mainPanel(plotOutput("barPlot", click="plotClick"), width=12),
    selectInput("category", "Category", c("All", mainCategories)),
    verbatimTextOutput("debug")
))

# Define server logic required to draw a histogram
server <- shinyServer(function(input, output, session) {
    observations = reactive({ subset(read.csv("maindata.csv"), main.category != "Geldbeheer") }); 
    observe({
        if (!is.null(input$plotClick) & input$category == "All") {
            updateSelectInput(session, "category", 
                selected = mainCategories[round(input$plotClick$y)])
        }
    })

    shinyURL.server(session)
    output$barPlot <- renderPlot({
         params <- parseQueryString(session$clientData$url_search)
         dt = observations();
         if (input$category != "All") {
             pl = ggplot(subset(dt, main.category == input$category), aes(x=sub.category, y=amount))
         }
         else {
             pl = ggplot(dt, aes(x=main.category, y=amount))
         }
         pl + 
             geom_bar(stat='sum') + 
             facet_grid(.~month) + 
             coord_flip() #+
             #theme(axis.text.x = element_text(angle = 90, hjust =0))
    })
    output$debug <- renderPrint({
        input$plotClick
    })
})

# Run the application 
shinyApp(ui = ui, server = server, options=options(shiny.port = 6688))

