🔨 Hammertime: The Ultimate Mole-Smashing Experience

Do you like smashing things to death? Then Hammertime is exactly what you need! 💥🐭

🚀 Where to Play

You can start whacking moles right now at:
👉 Hammertime Live! https://hammertime.onrender.com/

And guess what? We've got a leaderboard to fuel your competitive rage! Check it out here:
👉 Leaderboard  https://political-mire-enquiry.glitch.me/leaderboard (it's the backend service)

🛠️ Running It Locally (Because Sometimes the Internet Fails You)

We've Dockerized this bad boy so you can smash moles in peace even without an internet connection. Here’s how you do it:

1️⃣ Build the image:

docker build -t hammertime .

2️⃣ Run the image:

docker run -p 8080:8080 hammertime

3️⃣ Open your browser and head to http://localhost:8080 – and you're good to go!

🤖 Automated Awesomeness

Hammertime is continuously deployed so you always get the freshest, bug-smashiest version. We even have workflows running E2E tests, so if anything breaks, we know before you do (hopefully). 🕵️‍♂️💻

I really enjoyed this little project a lot. Hopefully you do aswell.

🤖 Tests!
npm run test
for e2e 
npx playwright install
npx playwright test