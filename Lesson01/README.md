# git-config

git config  --global user.name "Anna Sokolwska"
git config --global user.email milanka.anka@gmail.com

git config --list # посмотреть настройки 

git config --global core.autocrlf input
git config --global core.safecrlf warn
git config --global core.quotepath off
git config --global init.defaultBranch main # Ветка по умолчанию


 git init # инициализация git репозитория

 git status # узнать текущее состояние репозитория

 git add # добавить в трек файл или папку (отслеживать)

 git add .  # добавить все файлы из корня в трек

 git commit -m "сообщение" # выполнить коммит (сделать слепок) текущего состояния проекта
 git diff # показывает текущее измение
 git diff color.words # строчки какие изменились внутри строчки
git checkout  имя файла # восстановить
git checkout . # восстановить все 
 git log --online #посмотреть историю коммита