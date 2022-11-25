if [ $(echo "$ENVIRONMENT")=="develop" ]
then
    npm run dev
else
    npm run start
fi

echo "`date`: 🤖 All ready boss!"