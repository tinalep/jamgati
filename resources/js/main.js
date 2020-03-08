// Check if page is of type "create"
// window.onload
window.onload = function() {
    
    checkUrl();
    // changeSidebar();
    openSidebar();

    window.onresize = function() {
        // changeSidebar();
    };

    function checkUrl(){
        const currentLocation = JSON.stringify(window.location);

        const searchTerm = 'create';
        const searchOtherTerm = 'edit';
        const haveTerm = currentLocation.indexOf(searchTerm);
        const haveOtherTerm = currentLocation.indexOf(searchOtherTerm);
        if(haveTerm !== -1 || haveOtherTerm !== -1 && haveTerm !== 'create-guest'){
            let dashboard = document.querySelector('.page-dashboard');
            dashboard.classList.add('page-create');
            document.body.classList.add('page-create');

            //Collapse sidebarNav
            let sidebarNav = document.querySelector('.sidebar');
            console.log(sidebarNav);
            if(sidebarNav){
                sidebarNav.classList.add('sidebar--collapsed');
            }
        }
    }

    function openSidebar(){
        let dashboard = document.querySelector('.page-dashboard');
        let sidebar = document.querySelector('.sidebar');
        let burger = document.querySelector('#burger');
        let close = document.querySelector('.close-sidebar')

        if(dashboard){
            burger.addEventListener('click', function(){
                if(sidebar.classList.contains('sidebar--open')){
                    sidebar.classList.remove('sidebar--open');  
                }
                else{
                    sidebar.classList.add('sidebar--open');
                }
            })
            close.addEventListener('click', function(){
                if(sidebar.classList.contains('sidebar--open')){
                    sidebar.classList.remove('sidebar--open');  
                }
            })
        }
    }

};