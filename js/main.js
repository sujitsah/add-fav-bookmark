//liseten for submit	
document.getElementById('myform').addEventListener('submit',saveBookmark);

function saveBookmark(e){
	var siteName= document.getElementById('siteName').value;
	var siteUrl= document.getElementById('siteUrl').value;

if(!validate(siteName,siteUrl)){
	return false;
}


var bookmark={
	name: siteName,
	url: siteUrl
}

if(localStorage.getItem('bookmarks') === null){
 //initalise an array
 var bookmarks=[];
 bookmarks.push(bookmark);
 localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}
else{
	//get json from bookmarks
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//add bookmark to array
	bookmarks.push(bookmark);
	//reset to local

	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}

document.getElementById('myform').reset();

fetchBookmarks();

//it prevents running
	e.preventDefault();
}








//delete bookmark

function deleteBookmark(url){
	//get bookamrks
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//loop
for(var i=0;i<bookmarks.length;i++){

	if (bookmarks[i].url== url) {
		bookmarks.splice(i,1);
	}


}

localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
fetchBookmarks();

}



//fetch data from local and show ui

function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//get ouput
	var bookmarksResults= document.getElementById('bookmarksResults');

	//build output
	bookmarksResults.innerHTML = '';
	for (var i=0;i<bookmarks.length;i++) {

		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		bookmarksResults.innerHTML += '<div class="well">'+
										'<h3>'+ name +
										' <a class=" btn btn-default" target="_blank" href="' +url+ '">visit</a>'+
										' <a onclick="deleteBookmark(\''+url+'\')" class=" btn btn-danger"  href="#">delete</a>'
										'</h3>' +
										'</div>';
			}
}


function validate(siteName,siteUrl){
	if(!siteName || !siteUrl){
		alert('please fill the form');
		return false;
	}

var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if(!siteUrl.match(regex)){
	alert('please use valid url');
	return false;
}
return true;
}
