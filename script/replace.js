let fs = require('fs');
let path = require('path');

let config = {
	importTargetPath: '../componet/Tip',
	src: '../src/'
};

//y运行命令行，按照相对路径
let targetPath = path.join(__dirname, '../src/components/Tips')
let pathname = path.join(__dirname, config.src);
// console.log(pathname, 'pathname');
// console.log(path.dirname(pathname), 'dirname');
// console.log(path.extname(pathname), 'extname');
// console.log(path.isAbsolute(pathname), 'isAbsolute');
// console.log(path.normalize(pathname), 'normalize');
// console.log(path.parse(pathname), 'pathname');

// let aa = path.join(__dirname, "../src/index.js");
// let b = fs.readFileSync(aa, 'utf-8');

//fs.readFileSync fs.readFile是用来读取文件的 要是文件夹，会报错
// fs.readFileSync(pathname, 'utf-8', function(err, data) {
// 	console.log(err, data, 'readFileSync')
// })
//fs.readdirSync 读取当前目录下的所有文件 
//let a = fs.readdirSync(pathname, 'utf-8');

let getFileContent = filespath => {
	if(!filespath.length) return false;
	filespath.map( filepath => fs.readFile(filepath, 'utf-8', (error, data) => {
		if(error) return console.log('error:' + error);
		writeFile(filepath, data);
	} ))
};

let writeFile = (filepath, data) => {
	getImportPath(filepath);
	let ix = data.indexOf("alert(") === -1;
	let newData = data.replace(/alert\(/g, 'console.log(');
	newData = 'import AAA from "react";' + '\n' + newData;
	fs.writeFile(filepath, newData, (error, data) => {
		if(error) {
			console.log('error: ' + error)
		}else{
			console.log('读写成功')
		}
	})

};


/**
* @params {string} filepath
* @return {string} relativepath 相對路徑
*/
let getImportPath = filepath => {
	let relativePath = path.relative(filepath, targetPath);
	let b = relativePath.split(path.sep);
	console.log(b.join('/'))
	
};

/**
*@params {string} 路径
*@return {Array}  所有文件路径 数组
*/
let getAllFile = dir => {
	let filesArr = [];
	let read = dir => {
		fs.readdirSync(dir, 'utf-8').map(childDir => {
			let curDir = dir + childDir;
			if(fs.statSync(curDir).isDirectory()){
				read(dir + childDir + '/');
			}else{
				filesArr.push(curDir);
			}

		})
	}
	read(dir);
	return filesArr;
};

let f = getAllFile(pathname);
getFileContent(f);