// Check if page is of type "create"
// window.onload
window.onload = function() {
    
    checkUrl();
    openSidebar();
    changeSidebar();

    window.onresize = function() {
        openSidebar();
        changeSidebar();
    };

    //Sort table
    const table = document.querySelector('.table_dashboard');
    if(table){
        const compare = (ids, asc) => (row1, row2) => {
            const tdValue = (row, ids) => row.children[ids].textContent;
            const tri = (v1, v2) => v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2);
            return tri(tdValue(asc ? row1 : row2, ids), tdValue(asc ? row2 : row1, ids));
        };
        
        const tbody = document.querySelector('tbody');
        const thx = document.querySelectorAll('th');
        const trxb = tbody.querySelectorAll('tr');
        thx.forEach(th => th.addEventListener('click', () => {
            let classe = Array.from(trxb).sort(compare(Array.from(thx).indexOf(th), this.asc = !this.asc));
            classe.forEach(tr => tbody.appendChild(tr));
        }));
    }


    function checkUrl(){
        const currentLocation = JSON.stringify(window.location);

        const searchTerm = 'create';
        const searchOtherTerm = 'edit';
        const haveTerm = currentLocation.indexOf(searchTerm);
        const haveOtherTerm = currentLocation.indexOf(searchOtherTerm);
        if(haveTerm !== -1 || haveOtherTerm !== -1){
            let dashboard = document.querySelector('.page-dashboard');
            let windowWidth = window.innerWidth;
            dashboard.classList.add('page-create');
            document.body.classList.add('page-create');

            //Collapse sidebarNav
            if(windowWidth > 991){
                let sidebarNav = document.querySelector('.sidebar');
                console.log(sidebarNav);
                if(sidebarNav){
                    sidebarNav.classList.add('sidebar--collapsed');
                }
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

    function changeSidebar(){

        let windowWidth = window.innerWidth;
        const sidebar = document.querySelector('.sidebar');
        const dashboard = document.querySelector('.page-dashboard');
        const create = document.querySelector('.page-create');

        if(dashboard){
            if(!create){
                if(windowWidth < 991 && windowWidth > 768){
                    sidebar.classList.add('sidebar--collapsed');
                }
                else{
                    sidebar.classList.remove('sidebar--collapsed');
                }
            }
        }
}


};