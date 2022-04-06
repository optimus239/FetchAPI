
var courseApi = 'http://localhost:3000/courses';

function start(){
    getCourses(renderCourse);
    handleCreateForm();
}

start();

function getCourses(callback){
    fetch(courseApi)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function createCourse(data, callback){
    var options = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(courseApi, options)
        .then(function(response){
            response.json();
        })
        .then(callback);
    }
    
function updateCourse(id, data, callback){
    var options = {
        method:'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(courseApi + '/' + id, options)
        .then(function(response){
           return response.json();
        })
        .then(callback)
}

function handleDeleteCourse(id){
    var options = {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(courseApi + '/' + id, options)
        .then(function(response){
            response.json();
        })
        .then(function(){
            var courseItem = document.querySelector('.course-item-' + id);
            if(courseItem){
                courseItem.remove();
            }
        
        });
}



function renderCourse(courses){
    var listCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function(course){
        return `
            <li class="course-item-${course.id}">
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
                <button onclick="handleUpdateCourse(${course.id})">Sửa</button>
            </li>
        `;
    });
    listCoursesBlock.innerHTML = htmls.join('');
}

function handleCreateForm(){
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        
        var formData = {
            name: name,
            description: description
        };
        createCourse(formData, function(){
            getCourses(renderCourse);
        });

    }

}

function handleUpdateCourse(id){
    var courseItem = document.querySelector('.course-item-' + id) 
    var name = document.querySelector('input[name="name"]').value = 
    courseItem.querySelector('h4').innerText;
    var description = document.querySelector('input[name="description"]').value = 
    courseItem.querySelector('p').innerText;
    var createBtn = document.querySelector('#create');
    createBtn.innerText = 'Edit';
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var formData = {
            name: name,
            description: description
        };
        updateCourse(id,formData, function(){
            getCourses(renderCourse);
        });
        createBtn.innerText = 'Create';
        name.value = '';
        description.value = '';
    }
    
}