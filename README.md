# FAPAX - An essential kit for Oracle APEX
FAPAX is a collection of essential tools and resources for Oracle APEX developers. It makes it easier to do complex tasks without having to write or copy code on every page.

Feel free to use FAPAX in your own projects. If you find any bugs or need assistance, please contact me. I am also open to suggestions for new features.

Here is the list of files and their purposes:

| Name                     | Description                                                              |
|--------------------------|--------------------------------------------------------------------------|
|fapax.js                  | This file is contains the JS code for all the FAPAX modules.             |


## Requirements
- Oracle Apex 23.1

## How to Install

First, download the following files:


### 1. fapax.js
1. Donwload from gitHub.
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
1. Single and Muliple row selection
2. Enables to add Selection change Dynamic Action
3. Get data for selected/All rows
4. Get data for most recently selected row
5. Add class to selected row

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
| Name                      | Default  |  Purpose                                                     | 
|---------------------------|-----------|----------------------------------------------------------------------|
| `multiSelection`         | `False` | To get array of Selected Rows Objects. |
| `selectFirstRow`              | `True`| To get array of All the Rows Objects.   |
| `selectionClass`     | `undefined` | To get array of Selected Rows Arrays.   |


#### Methods
| Method Name                | Purpose                                                                        | 
|---------------------------|---------------------------------------------------------------------------------|
| `getSelectedRows`         | To get array of Selected Rows Objects. |
| `getAllRows`              | To get array of All the Rows Objects.   |
| `getSelectedRowsData`     | To get array of Selected Rows Arrays.   |
| `getAllRowsData`          | To get array of All the Rows Arrays.     |
| `getColumnList`           | To get array of available columns'  |
| `selectAll`               | Select all rows     |
| `clearSelection`          | Clear the selection|



[**Video Tutorial**](https://youtu.be/zzgZ1enBkxI)

#### Assumptions
1. Works only for Clissic and Interactive Reports
2. In case of pagination, FAPAX will work only for current Page

## 📖 Usage

### Page Properties
Initialize FAPAX report module by adding following code in Page `Properties > Function and Global Variable Declaration`

#### To Create a Home Page
Create a Page with following `Page Properties` setting

| Property       | Value           |
|----------------|-----------------|
| `Page Mode`    | `Normal`        |
| `CSS Classes`  | `spa-home`      |


### SPA Dialogs
SPA Dialogs are the pages called over the Home page.

#### To Create a SPA Dialog Page
Create a Page with following `Page Properties` setting

| Property         | Value           |
|------------------|-----------------|
| `Page Mode`      | `Modal Dialog`  |
| `Dialog Template`| `spaDialog`     |

#### SPA Dialog Customization
You can further modify the layout of SPA Dialogs be adding one or more classes from the following list in `Page Prperties > Dialog > CSS Classes` section. Classes must be seprated by `space`

| Class Name                | Purpose                                                                                                    | 
|---------------------------|------------------------------------------------------------------------------------------------------------|
| `spa-noTitle`             | This class will remove the titlebar from SPA Dialogs. You've to add close button to close it.              |
| `spa-Draggable`           | This class will make the SPA dialog Draggable. By ddfault SPA Dialogs are not draggable.                   |
| `spa-Resizable`           | This class will make the SPA dialog Resizable. By ddfault SPA Dialogs are not Resizable.                   |
| `spa-showBreadcrumb`      | SPA Dialog will position after the `Breadcrumbs` area of Home Page.                                        |
| `spa-showFooter`          | SPA Dialog will end before the Footer, making it visible all the time.                                     |


## Other Useful Functions

### setDimentions()
This Function will reset the size and positions of all the opened SPA Dialogs.

```
setDimentions();
```

### spaCloseAllDialog()
This Function will close all the opened SPA Dialogs.

```
spaCloseAllDialog();
```
### Author
**Farhan Akram**  
Sr. Oracle Apex Developer  
mrfarhanakram@outlook.com  
[Linkedln](https://www.linkedin.com/in/mrfarhanakram)
