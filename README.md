# survival-game-js

Mini survival game writed in javascript

Live app:
    
[Survival Game](https://survivalgame.mhcode.dev)

## 1.- Installation

    git clone https://github.com/marceb1296/survival-game-js.git

1. ### Docker:

        $ cd survival-game-js

        $ docker compose up

    Open the given url by docker

2. ### Non Docker:

    Create env with python

        $ python3 -m venv myenv
        
        $ source myenv/bin/activate

    Install node with pip

        $ pip install nodeenv
        
        # or, install latest version of nodeenv
        
        $ pip install -e git+https://github.com/ekalinin/nodeenv.git#egg=nodeenv

        $ nodeenv --version
        0.6.5
        
        # add a node virtual environment to this existing myenv:
        
        $ nodeenv -p
    
    Install package & start project
   
        $ cd survival-game-js/frontend

        $ npm i --production=false

        $ npm start

    Open the given url by console

## 2. Game

1. ### Tools
 
    - When you use a Tool, the life of itself will be reduced randomly
    - You will receive extra materials with the correct tool

2. ### Materials

   - Trees have a 30% probability to show up.
   - Rocks have a 20% probability to show up
   - Material obtained by killing an animal is 50% probability

3. ### Animals

    - Animals have a 20% probability to  show up
    - if there's an animal and you go forward, you will receive extra damage

4. ### Food

    - Raw meat has a 50% probability to make you seek

5. ### Night

    - You will receive 50% more damage from animals 
