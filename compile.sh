jade -P -p templates/includes -o public templates
lessc --strict-imports less/main.less public/css/main.css
cp js/main.js public/js/main.js
