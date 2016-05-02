a3-racheryl-xiaojzhu
===============

## Team Members

1. Xiaojing Zhu (xiaojzhu)
2. Rachel Li (ryli)

## Prestige of Canadian Occupations
This visualization shows the Pineo-Porter prestige score for 102 Canadian occupations, from a social survey conducted in the mid-1960s, along with the average education of occupational incumbents (years), the average income of incumbents (dollars), the percentage of incumbents who are women (%) and the type (blue collar/white collar/professional) for each occupations in year 1971. This multi-dimensional data is shown in  parallel coordinates on the top and the data table on the bottom. You can interact with either the parallel coordiantes or the table. (Details of the dataset are written in the story borad below.)
 
For the parallel coordinates part, you can 

* drag around axis to begin single or multiple variable brushing (the data table would change based on brushing, it only shows the brushed data)
* click axis to clear brush
* click a label to color data based on axis values 
* hover on each line to highlight and show tooltip

For the data table part, you can 

* hover on each row in the table to highlight the row and the corresponding line in parallel coordinates 
<!-- * click column names of quantitative variables to sort based on values in the clicked column   -->
* type in the search box for prefix match occupations


## Running Instructions

Access our visulization at <http://cse512-16s.github.io/a3-racheryl-xiaojzhu/> or download this repository and run `python -m SimpleHTTPServer 9000` and access this from http://localhost:9000/.

## Story Board

Please see our storyboard in [this pdf file](cse512-a3-storyboard.pdf).


### Changes between Storyboard and the Final Implementation

There are several changes between the storyboard and final implementation on the interactive functionalities. 

First, for the functionality of clicking a label to color data based on axis values, instead of using lumens to encode the values of any one continuous variable, we use color scale from red to blue to encode, thus making the change more easily to track. Also, we decided to delete the legend for occupation types because such information can be easily read from the type axis. 

Second, we switched off the axis-reordering functionality in the parallel coordinates prototype because such reordering will mess up with the match of tooltip and axes when we hover on each line to highlight and show tooltip. Also, instead of hovering on each line to only show the occupation name, we made it to show occupation name as well as the values for each axes in text boxes. 

Third, for the data table part, we initially planned to add sorting functionality to every quantitative variables through clicking, however we did not successfully implement it.

Finally, we added text instructions on the right side of parallel coordinates to offer guidence for the interaction functionalities.

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
   * search box: 6 hours
   * click line to highlight data row: 3 hours
   * sorting: 4 hours+ (failed) 
   * layout, legend, titles and other polishing work in CSS: 5 hours

* Setting up the development environment took a lot of time because we didn't know how to phrase our questions for search. Development took the most amount of time. 

<!-- 
- text box of occupation name in paral. coord.
- reorder axes
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