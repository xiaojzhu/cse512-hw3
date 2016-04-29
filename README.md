a3-racheryl-xiaojzhu
===============

## Team Members

1. Xiaojing Zhu (xiaojzhu)
2. Rachel Li (ryli)

## Prestige of Canadian Occupations
This visualization shows the Pineo-Porter prestige score for 102 Canadian occupation, from a social survey conducted in the mid-1960s, along with the average education of occupational incumbents (years), the average income of incumbents (dollars), the percentage of incumbents who are women (%) and the type (blue collar/white collar/professional) for each occupations in year 1971. This multi-dimensional data is shown in  parallel coordinates on the top and the data table on the bottom. You can interact with either the parallel coordiantes or the table. (Details of the dataset are written in the story borad below.)
 
For the parallel coordinates part, you can 

* drag around axis to begin brush (the data table would change based on the brush, it only shows the brushed data)
* click axis to clear brush
* click a label to color data based on axis values 
* hover on each line to highlight and show tooltip

For the data table part, you can 

* hover on each row in the table to highlight the row and the corresponding line in parallel coordinates 
* click column names of quantitative variables to sort based on values in the clicked column 
* type in the search box to find certain occupations


## Running Instructions

Access our visulization at <http://cse512-16s.github.io/a3-racheryl-xiaojzhu/> or download this repository and run `python -m SimpleHTTPServer 9000` and access this from http://localhost:9000/.

[Don't forget to do this.......
If you put your work online, please also write a [one-line description and add a link to your final work](http://note.io/1n3u46s) so people can access it directly from the CSE512-16S page.]

## Story Board

Please see our storyboard in [this pdf file](cse512-a3-storyboard.pdf).


### Changes between Storyboard and the Final Implementation

A paragraph explaining changes between the storyboard and the final implementation.


## Development Process

<!-- Include:
- Breakdown of how the work was split among the group members.
- A commentary on the development process, including answers to the following questions:
  - Roughly how much time did you spend developing your application?
  - What aspects took the most time? -->

* Xiaojing initially focused on the parallel coordinates part, Rachel focused on the data table part and the aesthetic settings. 

* Tasks and hours spent:
   * dataset selection and storyboard: 7 hours
   * make the parallel coordiantes prototype work: 6 hours
   * click a label to color data based on axis values: 3 hours
   * hover on each line to highlight and show tooltip: 5 hours
   * hover on each row of table to highlight the line in parallel coordiantes: 1 hours
   * search box:
   * click line to highlight data row:
   * sorting:
   * scrolling in grid:
   * layout, legend, titles and other polishing work: 

3. What aspects took the most time. - text box of occupation name in paral. coord.

<!-- - reorder axes
- coloring of spaghetti lines: lumens by value selected, color by type
- click legend to filter type
- remove or keep the three buttons keep, exclude, reset
- add unit to axes

 Functionality by Members: 
- Xiaojing:
  - legend of type 
	- scrolling in grid
- Rachel:
	- order data alphabetically
	- add unit to axes
	- color and lumens -->