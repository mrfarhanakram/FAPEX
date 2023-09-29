# FAPAX - An essential kit for Oracle APEX
FAPAX is and Oracle APEX essential kit, developed Oracle APEX developer to do may things easily.

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
1.&nbsp;[**FAPEX Reports**](#fapex-reports)



**Contributors**  
&nbsp;&nbsp;&nbsp;&nbsp;[Farhan Akram](https://www.linkedin.com/in/mrfarhanakram)


## FAPEX Reports
To make your Classic Reports and Interactive Reports selectable similar to 

#### Features
1. Single and Muliple row selection
2. Enables to add Selection change Dynamic Action

[**Video Tutorial**](https://youtu.be/zzgZ1enBkxI)

#### Assumptions
1. Works only for Clissic and Interactive Reports

## 📖 Usage
If you've completed the installation steps, you are ready to use it.

### Home Page
This is a Index/Home/Calling page that will remain visible all the time. 

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
