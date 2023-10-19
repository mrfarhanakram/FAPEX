# FAPEX - An essential kit for Oracle APEX
FAPEX is a collection of essential tools and resources for Oracle APEX developers. It makes it easier to do complex tasks without having to write or copy code on every page.

Feel free to use FAPEX in your own projects. If you find any bugs or need assistance, please contact me. I am also open to suggestions for new features.

[**Video Introduction**](https://youtu.be/BpyXpcwmJmI)

Here is the list of files and their purposes:

| Name                     | Description                                                              |
|--------------------------|--------------------------------------------------------------------------|
|fapex.js                  | This file is contains the JS code for all the FAPEX modules.             |
|fapex.css                 | This file contains the CSS rules related to FAPEX.                       |
|pkg_fapex.sql             | This file contains the backend package to be deployed in database.       |

### Modules
1.&nbsp; [**FAPEX Reports**](#fapex-reports)  
2.&nbsp; [**Fapex Navigation**](#fapex-navigation)  
3.&nbsp; [**Fapex Featuress**](#fapex-features)  

## Compatibility
- Oracle APEX 23.1

## How to Install

First, download the following file(s):


### 1. fapex.js
1. Download this file from gitHub.
2. Upload in Static Application Files `Application > Shared Components > Static Application Files` of your Application.
3. Copy the Reference/Path
4. Add the Reference/Path in `Application > Shared Components > User Interfaces > JavaScript > File URLs`

### 2. fapex.css
1. Download this file from gitHub.
2. Upload in Static Application Files `Application > Shared Components > Static Application Files` of your Application.
3. Copy the Reference/Path
4. Add the Reference/Path in `Application > Shared Components > User Interfaces > CSS > File URLs`

### 3. pkg_fapex.sql
1. Download this file from gitHub.
2. Go to **SQL Scripts** section under **SQL Workshop**
3. Click upload button and upload the **pkg_fapex.sql**.
4. Click run button.

### 4. Creating Fapex Application Process
1. Go to `Application > Shared Components > Application Processes`
2. Click `Create` and set `Name = FAPAXPROCESS` and `Point = Ajax Callback`
3. Click **Next**
4. Enter `PKG_FAPEX.execute_fapex_procedures;` in Code section
5. Click **Next** and then `Create Process`


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

[**Video Tutorial**](https://youtu.be/Gbkph4V7dK4)

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
First of all,&nbsp; [**intstall FAPEX**](#how-to-install)

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

## FAPEX Navigation
Passing parameters and navigating to a page throught JavaScript has become very easy.

#### Features
1. Generate Parameter list at runtime
2. Decide calling page at runtime
3. Navigate to any page at runtime through JavaScript
4. Open Page in separte tab.

[**Video Tutorial**](https://youtu.be/0P6JGSL0Ilc)

#### Assumptions
1. Works only to Navigate/Open apex pages.


#### Functions

### 1.genPageId(app_id,page_no)

Output: `#app_id@page_no`

| Argument Name     | Type    | Required   | Description  |            
|-------------------|----------|----------|----------------------|
| `app_id`          | String   | Yes | Application ID of the page |
| `page_no`          | String   | Yes | Page No of the page |

### 2.extractAppId(PageId)
Output: Returns Application ID extracted from input.

| Argument Name     | Type    | Required   | Description  |            
|-------------------|----------|----------|----------------------|
| `PageId`        | String | Yes | Page ID in the format `#app_id@page_no` |

### 3.extractPageId(PageId)
Output: Returns Page No extracted from input.

| Argument Name     | Type    | Required   | Description  |            
|-------------------|----------|----------|----------------------|
| `PageId`        | String | Yes | Page ID in the format `#app_id@page_no` |


### 4.genURL(PageId)
Output: Returns URL for given page and parameters.

| Argument Name     | Type    | Required   | Description  |            
|-------------------|----------|----------|----------------------|
| `PageId`        | String | Yes | Page ID in the format `#app_id@page_no` |
| `paramObj`        | Object | No | Object containing parameters. `Key: <Parameter Name>, Value: <Parameter Value>` i.e. {P20_EMPLOYEE_ID:'5425', P20_AGE:'25'} |

### 5.navToPage(PageId)
   Navigate to the given page.

| Argument Name     | Type    | Required   | Description  |            
|-------------------|----------|----------|----------------------|
| `PageId`        | String | Yes | Page ID in the format `#app_id@page_no` |
| `paramObj`        | Object | No | Object containing parameters. `Key: <Parameter Name>, Value: <Parameter Value>` i.e. {P20_EMPLOYEE_ID:'5425', P20_AGE:'25'} |

### 6.openPage(PageId)
   Open page in separate tab.

| Argument Name     | Type    | Required   | Description  |            
|-------------------|----------|----------|----------------------|
| `PageId`        | String | Yes | Page ID in the format `#app_id@page_no` |
| `paramObj`        | Object | No | Object containing parameters. `Key: <Parameter Name>, Value: <Parameter Value>` i.e. {P20_EMPLOYEE_ID:'5425', P20_AGE:'25'} |

## 📖 Usage
First of all,&nbsp; [**install FAPEX**](#how-to-install)

### Navigation/Open Page

**Navigate to Page**
```
let fxn = new FapexNavigation();
let paramObj = { P3_EMPLOYEE_NO: '123', P3_AGE: 25 }
fxn.navToPage('#285692@3', paramObj);
````
or you can use following snippet if the page has no parameters.
```
let fxn = new FapexNavigation();
fxn.navToPage('#285692@3', {});
````
**Open Page in separate tab**
```
let fxn = new FapexNavigation();
let paramObj = { P3_EMPLOYEE_NO: '123', P3_AGE: 25 }
fxn.openPage('#285692@3', paramObj);
````
or you can use following snippet if the page has no parameters.
```
let fxn = new FapexNavigation();
fxn.openPage('#285692@3', {});
````

## Fapex Features
This module contains different options to provide you exiting features without writing extra lines of code.

### 1. Copy Single Cell
If you try to copy a single Cell in Interactive Grid by pressing **Ctrl+C**, it will copy the whole row. If you want to copy only a focussed cell, add folloing code sippet on page load.

```
let fxf = new FapexFeatures();
fxf.copyIGCell();
```

[**Video Tutorial**](#)

#### Assumptions
1. Works only for Interactive Grids


### Author
**Farhan Akram**  
Sr. Oracle Apex Developer  
mrfarhanakram@outlook.com  
[Linkedln](https://www.linkedin.com/in/mrfarhanakram)
