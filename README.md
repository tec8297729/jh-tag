# nsh-tag

> auto push git tag +1

```shell
nsh-tag -p # 打tag基本当前版本+1
nsh-tag -p -st # 打tag，并且保存当前tag版本到package.json中（参数：subversion）
```


参数          |      描述       
------------- | -------------  
-v      | 显示当前版本号    
-p      | production版本
-st      | 保存tag版本注入package.json中的subversion参数
-n      | noBeta版本  
-m      | minio版本
-c      | 增加备注:例如-c "first version"
-f      | 从指定文件中获取version，默认文件为:build.gradle 例如:-f "package.json"
-s      | 增加tag后缀
-h      | 帮助
