namespace SpriteKind {
    export const Weapon = SpriteKind.create()
    export const Splash = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
    music.play(music.createSong(assets.song`Death`), music.PlaybackMode.InBackground)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    if (Immunity == false) {
        if (otherSprite == mySprite) {
            info.changeLifeBy(-1)
        } else {
            info.player2.changeLifeBy(-1)
        }
        sprites.destroy(sprite)
        music.play(music.createSong(assets.song`Death`), music.PlaybackMode.InBackground)
    }
})
controller.player2.onEvent(ControllerEvent.Connected, function () {
    canShoot2 = true
    canSwap2 = true
    EditPaper2 = sprites.create(assets.image`EditPaper`, SpriteKind.Weapon)
    sprites.destroy(EditPaper2)
    ShotyProjectile2 = sprites.create(assets.image`Shoty Projectile`, SpriteKind.Projectile)
    sprites.destroy(ShotyProjectile2)
    mySprite2 = sprites.create(assets.image`Jonesy`, SpriteKind.Player)
    mySprite2.setScale(2, ScaleAnchor.Middle)
    mySprite2.setPosition(120, 63)
    info.player2.setLife(5)
    info.player2.setScore(0)
    controller.player2.moveSprite(mySprite2)
    Player2Exists = true
    mySprite2Direction = 4
    Shoty2 = sprites.create(assets.image`Shoty`, SpriteKind.Weapon)
    Shoty2.follow(mySprite2, 500)
    Shoty2.setScale(2, ScaleAnchor.Middle)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
    if (sprite == ShotyProjectile2 || sprite == Wall2) {
        info.player2.changeScoreBy(1)
    } else {
        info.changeScoreBy(1)
    }
    music.play(music.createSong(assets.song`Death`), music.PlaybackMode.InBackground)
})
let mySprite3 = 0
let myEnemy: Sprite = null
let EnemyNumber = 0
let mySprite2: Sprite = null
let mySprite: Sprite = null
let Player2Exists = false
let ShotyProjectile: Sprite = null
let canSpawnEnemies = false
let canSwap2 = false
let canShoot2 = false
let Immunity = false
let EditPaper2: Sprite = null
let Shoty2: Sprite = null
let ShotyProjectile2: Sprite = null
let Wall: Sprite = null
let Wall2: Sprite = null
let mySprite2Direction = 0
Player2Exists = false
let canShoot = true
let canSwap = true
Immunity = true
let splash = sprites.create(assets.image`Fortnite Logo`, SpriteKind.Splash)
splash.setScale(2, ScaleAnchor.Middle)
splash.setPosition(80, 20)
let Play = sprites.create(assets.image`SettingsButton0`, SpriteKind.Splash)
Play.setPosition(80, 90)
mySprite = sprites.create(assets.image`Jonesy`, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setScale(2, ScaleAnchor.Middle)
mySprite.setPosition(80, 63)
info.setLife(5)
let EditPaper = sprites.create(assets.image`EditPaper`, SpriteKind.Weapon)
sprites.destroy(EditPaper)
ShotyProjectile = sprites.create(assets.image`Shoty Projectile`, SpriteKind.Projectile)
sprites.destroy(ShotyProjectile)
let Shoty = sprites.create(assets.image`Shoty`, SpriteKind.Weapon)
Shoty.setScale(2, ScaleAnchor.Middle)
Shoty.follow(mySprite, 500)
let mySpriteDirection = 4
game.onUpdate(function () {
    if (info.score() == 99) {
        if (Player2Exists == true) {
            game.setGameOverScoringType(game.ScoringType.None)
            game.setGameOverMessage(true, "You guys have rizz")
            game.gameOver(true)
        } else {
            game.setGameOverScoringType(game.ScoringType.None)
            game.setGameOverMessage(true, "You have rizz")
            game.gameOver(true)
        }
    }
    if (info.life() == 0) {
        sprites.destroy(mySprite)
        sprites.destroy(Shoty)
        sprites.destroy(EditPaper)
    }
    if (mySprite.overlapsWith(Play)) {
        scene.cameraFollowSprite(mySprite)
        canSpawnEnemies = true
        tiles.setCurrentTilemap(tilemap`level2`)
        sprites.destroy(splash)
        sprites.destroy(Play)
        info.setScore(0)
        game.showLongText("Press B to switch between building and your Zapatron", DialogLayout.Bottom)
        game.showLongText("Press A use your Zapatron to shoot enemies or your paper to build walls", DialogLayout.Bottom)
        game.showLongText("And lastly, shoot 99 enemies to win!", DialogLayout.Bottom)
        setTimeout(function () { Immunity = false }, 1000);
    }
    if (controller.up.isPressed()) {
        mySprite.setImage(assets.image`Jonesy Backside`)
        mySpriteDirection = 2
    }
    if (controller.right.isPressed()) {
        mySprite.setImage(assets.image`Jonesy Right Side`)
        mySpriteDirection = 3
    }
    if (controller.left.isPressed()) {
        mySprite.setImage(assets.image`Jonesy Left Side`)
        mySpriteDirection = 1
    }
    if (controller.down.isPressed()) {
        mySprite.setImage(assets.image`Jonesy`)
        mySpriteDirection = 4
    }
    if (Shoty.overlapsWith(mySprite)) {
        if (controller.up.isPressed()) {
            Shoty.setImage(assets.image`ItemUp`)
        }
        if (controller.right.isPressed()) {
            Shoty.setImage(assets.image`Shoty`)
        }
        if (controller.left.isPressed()) {
            Shoty.setImage(assets.image`ShotyAlt`)
        }
        if (controller.down.isPressed()) {
            Shoty.setImage(assets.image`ShotyDown`)
        }
        if (controller.B.isPressed() && canSwap == true) {
            canSwap = false
            sprites.destroy(Shoty)
            sprites.destroy(EditPaper)
            EditPaper = sprites.create(assets.image`EditPaper`, SpriteKind.Weapon)
            EditPaper.setScale(2, ScaleAnchor.Middle)
            EditPaper.follow(mySprite, 500)
            setTimeout(function () { canSwap = true }, 1000);
        }
        if (controller.A.isPressed() && canShoot == true) {
            canShoot = false
            music.play(music.createSong(assets.song`ShotySound`), music.PlaybackMode.InBackground)
            switch (mySpriteDirection) {
                case (4):
                    ShotyProjectile = sprites.createProjectileFromSprite(assets.image`Shoty Projectile Alt`, Shoty, 0, 150)
                    break;
                case (3):
                    ShotyProjectile = sprites.createProjectileFromSprite(assets.image`Shoty Projectile`, Shoty, 150, 0)
                    break;
                case (2):
                    ShotyProjectile = sprites.createProjectileFromSprite(assets.image`Shoty Projectile Alt`, Shoty, 0, -150)
                    break;
                case (1):
                    ShotyProjectile = sprites.createProjectileFromSprite(assets.image`Shoty Projectile`, Shoty, -150, 0)
                    break;
            }
ShotyProjectile.setScale(2, ScaleAnchor.Middle)
            setTimeout(function () { canShoot = true }, 1500);
        }
    } else {
        if (EditPaper.overlapsWith(mySprite)) {
            if (controller.up.isPressed()) {
                EditPaper.setImage(assets.image`ItemUp`)
            }
            if (controller.right.isPressed()) {
                EditPaper.setImage(assets.image`EditPaper`)
            }
            if (controller.left.isPressed()) {
                EditPaper.setImage(assets.image`EditPaperAlt`)
            }
            if (controller.down.isPressed()) {
                EditPaper.setImage(assets.image`EditPaperDown`)
            }
            if (controller.B.isPressed() && canSwap == true) {
                canSwap = false
                sprites.destroy(Shoty)
                sprites.destroy(EditPaper)
                Shoty = sprites.create(assets.image`Shoty`, SpriteKind.Weapon)
                Shoty.setScale(2, ScaleAnchor.Middle)
                Shoty.follow(mySprite, 500)
                setTimeout(function () { canSwap = true }, 1000);
            }
            if (controller.A.isPressed() && canShoot == true) {
                canShoot = false
                music.play(music.createSong(assets.song`BuildPlace`), music.PlaybackMode.InBackground)
                switch (mySpriteDirection) {
                    case (4):
                        Wall = sprites.createProjectileFromSprite(assets.image`WallDown`, EditPaper, 0, 0)
                        break;
                    case (3):
                        Wall = sprites.createProjectileFromSprite(assets.image`WallRight`, EditPaper, 0, 0)
                        break;
                    case (2):
                        Wall = sprites.createProjectileFromSprite(assets.image`Wall`, EditPaper, 0, 0)
                        break;
                    case (1):
                        Wall = sprites.createProjectileFromSprite(assets.image`WallLeft`, EditPaper, 0, 0)
                        break;
                }
Wall.setScale(2, ScaleAnchor.Middle)
                setTimeout(function () { canShoot = true }, 100);
            }
        }
    }
    if (Player2Exists == true) {
        if (info.life() == 0) {
            scene.cameraFollowSprite(mySprite2)
        }
        if (info.player2.life() == 0) {
            sprites.destroy(mySprite2)
            sprites.destroy(Shoty2)
            sprites.destroy(EditPaper2)
        }
        if (info.life() == 0 && info.player2.life() == 0) {
            game.setGameOverMessage(false, "you guys ded")
            game.gameOver(false)
        }
        if (controller.player2.isPressed(ControllerButton.Up)) {
            mySprite2.setImage(assets.image`Jonesy Backside`)
            mySprite2Direction = 2
        }
        if (controller.player2.isPressed(ControllerButton.Right)) {
            mySprite2.setImage(assets.image`Jonesy Right Side`)
            mySprite2Direction = 3
        }
        if (controller.player2.isPressed(ControllerButton.Left)) {
            mySprite2.setImage(assets.image`Jonesy Left Side`)
            mySprite2Direction = 1
        }
        if (controller.player2.isPressed(ControllerButton.Down)) {
            mySprite2.setImage(assets.image`Jonesy`)
            mySprite2Direction = 4
        }
        if (Shoty2.overlapsWith(mySprite2)) {
            if (controller.player2.isPressed(ControllerButton.Up)) {
                Shoty2.setImage(assets.image`ItemUp`)
            }
            if (controller.player2.isPressed(ControllerButton.Right)) {
                Shoty2.setImage(assets.image`Shoty`)
            }
            if (controller.player2.isPressed(ControllerButton.Left)) {
                Shoty2.setImage(assets.image`ShotyAlt`)
            }
            if (controller.player2.isPressed(ControllerButton.Down)) {
                Shoty2.setImage(assets.image`ShotyDown`)
            }
            if (controller.player2.isPressed(ControllerButton.B) && canSwap2 == true) {
                canSwap2 = false
                sprites.destroy(Shoty2)
                sprites.destroy(EditPaper2)
                EditPaper2 = sprites.create(assets.image`EditPaper`, SpriteKind.Weapon)
                EditPaper2.setScale(2, ScaleAnchor.Middle)
                EditPaper2.follow(mySprite2, 500)
                setTimeout(function () { canSwap2 = true }, 1000);
            }
            if (controller.player2.isPressed(ControllerButton.A) && canShoot2 == true) {
                canShoot2 = false
                music.play(music.createSong(assets.song`ShotySound`), music.PlaybackMode.InBackground)
                switch (mySprite2Direction) {
                    case (4):
                        ShotyProjectile2 = sprites.createProjectileFromSprite(assets.image`Shoty Projectile`, Shoty2, 0, 150)
                        break;
                    case (3):
                        ShotyProjectile2 = sprites.createProjectileFromSprite(assets.image`Shoty Projectile`, Shoty2, 150, 0)
                        break;
                    case (2):
                        ShotyProjectile2 = sprites.createProjectileFromSprite(assets.image`Shoty Projectile`, Shoty2, 0, -150)
                        break;
                    case (1):
                        ShotyProjectile2 = sprites.createProjectileFromSprite(assets.image`Shoty Projectile`, Shoty2, -150, 0)
                        break;
                }
ShotyProjectile2.setScale(2, ScaleAnchor.Middle)
                setTimeout(function () { canShoot2 = true }, 1500);
            }
        } else {
            if (EditPaper2.overlapsWith(mySprite2)) {
                if (controller.player2.isPressed(ControllerButton.Up)) {
                    EditPaper2.setImage(assets.image`ItemUp`)
                }
                if (controller.player2.isPressed(ControllerButton.Right)) {
                    EditPaper2.setImage(assets.image`EditPaper`)
                }
                if (controller.player2.isPressed(ControllerButton.Left)) {
                    EditPaper2.setImage(assets.image`EditPaperAlt`)
                }
                if (controller.player2.isPressed(ControllerButton.Down)) {
                    EditPaper2.setImage(assets.image`EditPaperDown`)
                }
                if (controller.player2.isPressed(ControllerButton.B) && canSwap2 == true) {
                    canSwap2 = false
                    sprites.destroy(Shoty2)
                    sprites.destroy(EditPaper2)
                    Shoty2 = sprites.create(assets.image`Shoty`, SpriteKind.Weapon)
                    Shoty2.setScale(2, ScaleAnchor.Middle)
                    Shoty2.follow(mySprite2, 500)
                    setTimeout(function () { canSwap2 = true }, 1000);
                }
                if (controller.player2.isPressed(ControllerButton.A) && canShoot2 == true) {
                    canShoot2 = false
                    music.play(music.createSong(assets.song`BuildPlace`), music.PlaybackMode.InBackground)
                    switch (mySprite2Direction) {
                        case (4):
                            Wall2 = sprites.createProjectileFromSprite(assets.image`WallDown`, EditPaper2, 0, 0)
                            break;
                        case (3):
                            Wall2 = sprites.createProjectileFromSprite(assets.image`WallRight`, EditPaper2, 0, 0)
                            break;
                        case (2):
                            Wall2 = sprites.createProjectileFromSprite(assets.image`Wall`, EditPaper2, 0, 0)
                            break;
                        case (1):
                            Wall2 = sprites.createProjectileFromSprite(assets.image`WallLeft`, EditPaper2, 0, 0)
                            break;
                    }
Wall2.setScale(2, ScaleAnchor.Middle)
                    setTimeout(function () { canShoot2 = true }, 100);
                }
            }
        }
    } else {
        if (info.life() == 0) {
            game.setGameOverMessage(false, "you ded")
            game.gameOver(false)
        }
    }
})
forever(function () {
    if (canSpawnEnemies == true) {
        canSpawnEnemies = false
        EnemyNumber = randint(1, 4)
        if (EnemyNumber == 1) {
            myEnemy = sprites.create(assets.image`Ramirez`, SpriteKind.Enemy)
            myEnemy.setPosition(134, 97)
            myEnemy.setScale(2, ScaleAnchor.Middle)
        } else if (EnemyNumber == 2) {
            myEnemy = sprites.create(assets.image`NoName`, SpriteKind.Enemy)
            myEnemy.setPosition(136, 15)
            myEnemy.setScale(2, ScaleAnchor.Middle)
        } else if (EnemyNumber == 3) {
            myEnemy = sprites.create(assets.image`YouButWithBlackGloves`, SpriteKind.Enemy)
            myEnemy.setPosition(16, 98)
            myEnemy.setScale(2, ScaleAnchor.Middle)
        } else {
            myEnemy = sprites.create(assets.image`RamirezBlue`, SpriteKind.Enemy)
            myEnemy.setPosition(76, 60)
            myEnemy.setScale(2, ScaleAnchor.Middle)
        }
        if (Player2Exists == true) {
            if (info.life() == 0) {
                myEnemy.follow(mySprite2, 25)
            } else if (info.player2.life() == 0) {
                myEnemy.follow(mySprite, 25)
            } else {
                mySprite3 = randint(1, 2)
                if (mySprite3 == 1) {
                    myEnemy.follow(mySprite, 25)
                } else {
                    myEnemy.follow(mySprite2, 25)
                }
            }
        } else {
            myEnemy.follow(mySprite, 25)
        }
        setTimeout(function () { canSpawnEnemies = true }, 4000);
    }
})
