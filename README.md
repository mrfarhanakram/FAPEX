# FAPEX - An essential kit for Oracle APEX
FAPEX is a collection of essential tools and resources for Oracle APEX developers. It makes it easier to do complex tasks without having to write or copy code on every page.

Feel free to use FAPEX in your own projects. If you find any bugs or need assistance, please contact me. I am also open to suggestions for new features.

[**Video Introduction**](https://youtu.be/BpyXpcwmJmI)

Here is the list of files and their purposes:

| Name                     | Description                                                              |
|--------------------------|--------------------------------------------------------------------------|
|fapex.js                  | This file is contains the JS code for all the FAPEX modules.             |


## Requirements
- Oracle APEX 23.1

## How to Install

First, download the following file(s):


### 1. fapex.js
1. Download from gitHub.
2. Upload in Static Application Files `Application > Shared Components > Static Application Files` of your Application.
3. Copy the Reference/Path
4. Add the Reference/Path in `Application > Shared Components > User Interfaces > JavaScript > File URLs`
   
### Modules
1.&nbsp; [**FAPEX Reports**](#fapex-reports)



**Contributors**  
&nbsp;&nbsp;&nbsp;&nbsp;[Farhan Akram](https://www.linkedin.com/in/mrfarhanakram)


## FAPEX Reports
To make your Classic Reports and Interactive Reports more interactive and useful. You can create master detail pages and do lot of selection based tasks.

#### Features
1. Single and Multiple row selection
2. Enables to add Selection change Dynamic Action
3. Get data for selected/All rows
4. Get data for most recently selected row
5. Add class to selected row

[**Video Tutorial**](https://youtu.be/zzgZ1enBkxI)

#### Assumptions
1. Works only for Classic and Interactive Reports
2. In case of pagination, FAPEX will work only for current Page


#### Functions
### 1.InitializeFapexReport(list)
| Argument Name     | Type    | Required   | Description  |            
|-------------------|----------|----------|----------------------|
| `list`            | Array/Object | Yes | Single/Array of objects `{staticId : <region static id>, options : <object with following properties>}` |

### 2.FapexReport(regionId, options)
| Argument Name     | Type    | Required   | Description  |            
|-------------------|----------|----------|----------------------|
| `regionId`        | String | Yes | Static ID of the region. |
| `options`         | Object | No |  Refer to following table for options object.|

##### Opitons Object
| Name                      | Default  | Required|  Purpose                                                     | 
|---------------------------|----------|----------|----------------------------------------------------------------------|
| `multiSelection`         | `False`| No | If the user is allowed to select multiple rows. |
| `selectFirstRow`         | `True`| No| If first row is selected by default. (If multiSelection is off)   |
| `selectionClass`     | `undefined` | No| Name of the class to be added if the row is selected.   |


### Available Methods
| Method Name                | Purpose                                                                        | 
|---------------------------|---------------------------------------------------------------------------------|
| `getSelectedRows`         | To get array of Selected Rows Objects. |
| `getAllRows`              | To get array of All the Rows Objects.   |
| `getSelectedRowsData`     | To get array of Selected Rows Arrays.   |
| `getAllRowsData`          | To get array of All the Rows Arrays.     |
| `getColumnList`           | To get array of available columns'  |
| `selectAll`               | Select all rows     |
| `clearSelection`          | Clear the selection|


## 📖 Usage
First of all,&nbsp; [**intstall FAPEX**](#how-to-intall)

### Page Properties
Initialize FAPEX report module by adding following code in Page `Properties > Function and Global Variable Declaration`

**One FAPEX Report on a Page**
```
let options = {
    multiSelection: true,
    selectFirstRow: false,
    selectionClass: 'MyClass'
};
fx = new InitializeFapexReport({ staticId: 'projects_report', options: options });
````
or you can simply add following to user default options
```
fx = new InitializeFapexReport({ staticId: 'projects_report'});
````
**Multiple FAPEX Reports on a Page**
```
let options = {
    multiSelection: true,
    selectFirstRow: false,
    selectionClass: 'MyClass'
};
fx = new InitializeFapexReport([{ staticId: 'projects_report', options: options },
                                { staticId: 'project_details', options: options },
                                { staticId: 'project_timelines', options: options }]);
```

#### Selection Change Dynamic Action
Add Dynamic Action 'Selection Change [Interactive Grid]' to Report region. Recently selected row data can be retrieved through `this.data` in JS code. For example to print the row data on console you can write following code in JS.

```
console.log(this.data);
```

### Author
**Farhan Akram**  
Sr. Oracle Apex Developer  
mrfarhanakram@outlook.com  
[Linkedln](https://www.linkedin.com/in/mrfarhanakram)
