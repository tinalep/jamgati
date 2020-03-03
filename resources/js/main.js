// Check if page is of type "create"
const currentLocation = JSON.stringify(window.location);

const searchTerm = 'create';
const searchOtherTerm = 'edit';
const haveTerm = currentLocation.indexOf(searchTerm);
const haveOtherTerm = currentLocation.indexOf(searchOtherTerm);
if(haveTerm !== -1 || haveOtherTerm !== -1 && haveTerm !== 'create-guest'){
    let dashboard = document.querySelector('.page-dashboard');
    dashboard.classList.add('page-create');

    //Collapse sidebarNav
    let sidebarNav = document.querySelector('.sidebar');
    console.log(sidebarNav);
    if(sidebarNav){
        sidebarNav.classList.add('sidebar--collapsed');
    }
}