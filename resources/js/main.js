// Check if page is of type "create"
const currentLocation = JSON.stringify(window.location);

const searchTerm = 'create';
const haveTerm = currentLocation.indexOf(searchTerm);

if(haveTerm !== -1){
    let dashboard = document.querySelector('.page-dashboard');
    dashboard.classList.add('page-create');

    //Collapse sidebarNav
    let sidebarNav = document.querySelector('.sidebar');
    console.log(sidebarNav);
    sidebarNav.classList.add('sidebar--collapsed');
}