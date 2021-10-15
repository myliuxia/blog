## Git 常用命令
 在使用Git时我们先要明确Git的四个工作区域，分别是工作区（Workspace）、暂存区（Index/Stage）、本地仓库（Repository）、远程仓库（Remote）

### 一、新建代码仓库
```shell
# 在当前目录新建一个Git代码仓库
git init

# 新建一个目录，将其初始化为Git代码仓库
git init [project-name]

# 拷贝一个远程项目的代码仓库
git clone [url]

```

### 二、配置
Git的设置文件为`.gitconfig`，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。

```shell
# 显示当前的Git配置
git config --list

# 编辑Git配置文件
git config -e [--global]

#设置提交代码时的用户信息
git config [--global] user.name "[name]"
git config [--global] user.email "[email addr]"
```

### 三、增加/删除文件

```shell
# 添加指定文件到暂存区
git add [file1] [files2] ...

# 添加指定目录到暂存区，包括子目录
git add [dir]

# 添加当前所有文件到暂存区
git add .

# 删除工作区文件，并将这次删除放入暂存区
git rm [file1] [file2] ...

# 停止追踪指定文件，但文件会保留在工作区
git rm --cached [file]

# 改名文件，并且将这个改名放入暂存区
git mv [file-original] [file-renamed]
```

### 四、代码提交
```shell
# 提交暂存区代码到仓库
git commit -m [message]

# 提交暂存区的指定文件到仓库
git commit [file1] [file2] ... -m [message]

# 提交工作区自上次commit之后的变化，直接到仓库区
git commit -a

# 提交时显示所有diff信息
git commit -v

# 使用一次新的commit,替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
git commit --amend -m [message]

# 重做上一次commit,并包括指定文件的新变化
git commit --amend [file1] [file2] ...

```

### 五、分支

```shell
# 列出所有本地分支
git branch

# 列出所有远程分支
git branch -r

# 列出所有本地分支和远程分支
git branch -a

# 新建一个分支，但任然停留在当前分支
git branch [new-branch]

# 新建一个分支，指向指定commit，但任然停留在当前分支
git branch [new-branch] [commit]

# 新建一个分支，与指定的远程分支建立追踪关系
git branch --track [branch] [remote-branch]

# 建立追踪关系，在现有分支与指定的远程分支之间
git branch --set-upstream [branch] [remote-branch]

# 删除本地分支
git branch -d [branch-name]

# 删除远程分支
git push origin --delete [branch-name]
git branch -dr [ramote/branch]

# 切换到指定分支，并更新工作区
git checkout [branch]

# 新建一个分支，并切换到该分支
git checkout -b [branch]

# 新建一个个全新的分支，不包含原分支的提交历史，并切换到该分支
git checkout --orphan [branch]

# 切换到上一个分支
git checkout -

# 合并指定分支到当前分支
git merge [branch]

# 合并指定分支到当前分支（与merge的区别后期单独整理）
git rebase [branch]

# 合并指定的commit到当前分支
git cherry-pick [commit]

```

### 六、标签

### 七、产看信息

### 八、远程同步

### 九、撤销

### 十、其他