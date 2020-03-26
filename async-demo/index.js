console.log('Before');
//getUser(1,getRepository);
console.log('After');
/**
function getRepository(user){
  getRepository(user.githubUsername,getCommits);
}

function getCommits(repos){
  getCommits(repo,displayCommits);
}

function displayCommits(commits){
  console.log(commits);
}
*/
//callbacks
//promises

//async and await
async function displayCommits(){
  try{
const user = await getUser(1);
const repos = await getRepository(user.githubUsername);
const commits = await getCommits(repos[0]);
console.log(commits);
}
catch(err){
  err => console.log('Error',err.message);
}
}

displayCommits();

const p = getUser(1);

p
  .then(user => getRepository(user.githubUsername) )
  .then(repositories => getCommits(repositories[0]))
  .then(commits => console.log(commits));
  .catch(err => console.log('Error',err.message));

function getUser(id){
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log('reading a user from db');
      resolve({id:id,githubUsername:'harshit'});
    },2000);
  })
}

function getRepository(username){
  return new Promise((resolve,reject)=>{
    setTimeout(() =>{
      console.log('calling Github api...');
      resolve(['repo1','repo2','repo3']);
    },2000);
  })
}

function getCommits(repo) {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['commit']);
    }, 2000);
  })
}


//promises

/***
console.log('Before');
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    })
  })
});
console.log('After');

function getUser(id, callback) {
  setTimeout(() => {
    console.log('Reading a user from a database...');
    callback({ id: id, gitHubUsername: 'mosh' });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    callback(['repo1', 'repo2', 'repo3']);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    callback(['commit']);
  }, 2000);
}
*/
