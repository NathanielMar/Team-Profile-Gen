const employee = require('./lib/employee')
const engineer = require('./lib/engineer')
const intern = require('./lib/intern')
const manager = require('./lib/manager')

const inquirer = require ('inquirer');
const Choices = require('inquirer/lib/objects/choices');

const fs = require('fs');

let mainHTML = ``;
let engineerHTML = `
<table>
    <thead>
        <tr>
            <th colspan="4">Engineer List</th>
        </tr> 
        <tr>
            <th>Name</th>
            <th>ID.</th>
            <th>Email</th>
            <th>Github</th>
        </tr>
    </thead>
</table>`;

let internHTML = `
<table>
    <thead>
        <tr>
            <th colspan="4">Intern List</th>
        </tr>
        <tr>
            <th>Name</th>
            <th>ID.</th>
            <th>Email</th>
            <th>School</th>
        </tr>
    </thead>
</table>`;

function startMenu(){

    createManager();
}

function createManager(){

    console.log('Create your team');
    
    inquirer.prompt([

        {
            type: 'input',
            name: 'managerName',
            message: "What's the team managers name?"
        },
        {
            type: 'input',
            name: 'managerId',
            message: "What's the team managers id?"
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: "What's the team managers email?"
        },
        {
            type: 'input',
            name: 'managerOfficeNum',
            message: "What's the team managers office number?"
        }

    ]).then(answers => {

        let manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNum)
        console.log(manager);

        mainHTML += `



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="./style.css">
</head>
<body>
    <header>
        <h1>Team Profile Generator</h1>
    </header>
    <!-- Table holding the information for the Manager -->
    <table>
        <thead>
            <tr>
                <th colspan="4">Manager</th>
            </tr>
            <tr>
                <th>Name</th>
                <th>ID.</th>
                <th>Email</th>
                <th>Office Number</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${manager.name}</td>
                <td>${manager.id}</td>
                <td>${manager.email}</td>
                <td>${manager.officeNumber}</td>
            </tr>
        </tbody>
    </table>
    <br>`

        chooseNext();
    })

}

function chooseNext(){

    inquirer.prompt([

        {
            type: 'list',
            name: 'chooseNext',
            message: "What type of employee are you adding?",
            choices: ["Intern", "Engineer", "I dont want to add an employee"]
        },

    ]).then(answer => {

        console.log(answer.chooseNext);
        if(answer.chooseNext === 'Engineer'){

            createEngineer();

        }else if(answer.chooseNext === 'Intern'){

            createIntern();

        }else{

            internHTML += `            
        </tbody>
    </table>
    <br>`

            engineerHTML += `            
        </tbody>
    </table>
    <br>`

            mainHTML = mainHTML + engineerHTML + internHTML;

            mainHTML += `        
</body>
</html>`

console.log('New List Created!');
console.log(mainHTML);

fs.writeFile('./dist/index.html', mainHTML,  err => {

    console.log(err);

});
}
})
}

function createEngineer(){
    
    inquirer.prompt([

        {
            type: 'input',
            name: 'engineerName',
            message: "What's the engineers name?"
        },
        {
            type: 'input',
            name: 'engineerId',
            message: "What's the engineers id?"
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: "What's the engineers email?"
        },
        {
            type: 'input',
            name: 'engineerGithub',
            message: "What's the engineers github link?"
        }


    ]).then(answers => {
        let engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
        console.log(engineer);
        
        engineerHTML += `            
            <tr>
                <td>${engineer.name}</td>
                <td>${engineer.id}</td>
                <td>${engineer.email}</td>
                <td>${engineer.github}</td>
            </tr>`
        
        chooseNext();

    })
}

function createIntern(){
    
    inquirer.prompt([

        {
            type: 'input',
            name: 'internName',
            message: "What's's the interns name?"
        },
        {
            type: 'input',
            name: 'internId',
            message: "What's the interns id?"
        },
        {
            type: 'input',
            name: 'internEmail',
            message: "What's the interns email?"
        },
        {
            type: 'input',
            name: 'internSchool',
            message: "What school did the intern attend?"
        },

    ]).then(answers => {
        let intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
        console.log(intern);

        internHTML += `            
            <tr>
                <td>${intern.name}</td>
                <td>${intern.id}</td>
                <td>${intern.email}</td>
                <td>${intern.school}</td>
            </tr>`

        chooseNext();

    })

}

startMenu();