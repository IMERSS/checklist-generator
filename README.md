### checklist generator

Allllllrighty. This is a supremely custom project which may prove useful for Biodiversity Galiano and Biodiversity
Squamish, and hopefully for a broader audience. 

It's a tool that converts a taxonomical CSV file into a checklist of rows, grouped by hierarchy. It's just a quick
project (by "quick", I mean just a few days) - it's already generating the data in HTML format, but needs to be a lot
more flexible in both the output (HTML, plain text) and in the manner by which you can use it. Being a front-end 
dev I've slapped a UI onto it that allows you to upload the CSV via the browser and generate the desired checklist, 
but I'd like to make it run separately as a node script so people can regenerate the data programmatically, just 
by saving a file.

Kiiinda want to write a complementary React component that would output the results in HTML format, plus a filtering 
field to let users search for specific items, but that may come later. 
