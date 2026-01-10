const courses = [
    { subject: 'CSE', number: 110, title: 'Intro to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web II', credits: 2, completed: false },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false }
];

function displayCourses(filter = 'all') {
    const container = document.querySelector('#course-container');
    container.innerHTML = '';

    const filtered = filter === 'all' ? courses : courses.filter(c => c.subject === filter.toUpperCase());

    filtered.forEach(course => {
        const div = document.createElement('div');
        div.className = `course-item ${course.completed ? 'completed' : ''}`;
        div.textContent = `${course.subject} ${course.number}`;
        container.appendChild(div);
    });

    const total = filtered.reduce((sum, course) => sum + course.credits, 0);
    document.querySelector('#total-credits').textContent = `Total credits: ${total}`;
}

document.querySelector('#all').addEventListener('click', () => displayCourses('all'));
document.querySelector('#cse').addEventListener('click', () => displayCourses('cse'));
document.querySelector('#wdd').addEventListener('click', () => displayCourses('wdd'));

displayCourses();