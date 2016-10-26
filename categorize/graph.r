require(ggplot2)
dt = read.csv('test.csv')
dt2 = subset(dt, main.category != "Geldbeheer")
ggplot(dt2, aes(x=main.category, y=amount)) + geom_bar(stat='sum') + facet_grid(.~month) + theme(axis.text.x = element_text(angle = 90, hjust =0))

