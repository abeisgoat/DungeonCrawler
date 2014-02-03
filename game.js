            var Game = angular.module('Game', ['ngAnimate']);
            
            Game.controller('Gameplay', function($scope, $timeout) {
                var MAX_MAP_SIZE = {Y: 15, X: 19};
                var DIRECTIONS = "NESW";
                var WALL_TYPES = {
                    "rock": 1,
                    "dirt": 2
                };
                
                $scope.position = {x: 10, y:15, ox: 10, oy: 15}
                $scope.direction = {letter: "N", number: 0};
                $scope.stats = {
                    health: 7,
                    attack: 3,
                    defense: 4
                }
                $scope.text = "You encountered a dude! He shouts \"Fight me! or don't, I get paid hourly\"";
                $scope.map = [];
                
                for (var y = 0; y <= MAX_MAP_SIZE.Y; y++) {
                    var row = [];
                    for (var x = 0; x <= MAX_MAP_SIZE.X; x++) {
                        row.push({status: 0});  
                    };
                    $scope.map.push(row);
                };
                $scope.map[12][10] = {
                    type: WALL_TYPES["rock"],
                    status: 1,
                }
                $scope.map[13][10] = {
                    type: WALL_TYPES["rock"],
                    status: 1
                }
                $scope.map[14][10] = {
                    type: WALL_TYPES["rock"],
                    status: 1
                }
                $scope.map[15][10] = {
                    type: WALL_TYPES["rock"],
                    status: 1
                }
                $scope.map[13][9] = {
                    type: WALL_TYPES["rock"],
                    solid: true,
                    status: 1
                }
               $scope.map[12][9] = {
                    type: WALL_TYPES["dirt"],
                    solid: true,
                    status: 1
                }
                $scope.map[14][8] = {
                    type: WALL_TYPES["dirt"],
                    solid: true,
                    status: 1
                }
                $scope.map[14][12] = {
                    type: WALL_TYPES["dirt"],
                    solid: true,
                    status: 1
                }
                $scope.map[15][11] = {
                    type: WALL_TYPES["dirt"],
                    solid: true,
                    status: 1
                }
                $scope.map[13][11] = {
                    type: WALL_TYPES["dirt"],
                    solid: true,
                    status: 1
                }
                $scope.map[12][11] = {
                    type: WALL_TYPES["dirt"],
                    solid: true,
                    status: 1
                }
                $scope.map[15][9] = {
                    type: WALL_TYPES["dirt"],
                    solid: true,
                    status: 1
                }
                $scope.map[14][9] = {
                    type: WALL_TYPES["dirt"],
                    encounter: true,
                    status: 1
                }
                $scope.map[14][11] = {
                    type: WALL_TYPES["dirt"],
                    status: 1
                }
                
                $scope.$watch('position.x + position.y + direction.letter', function () {
                    var position = $scope.position;
                    var direction = $scope.direction.letter;
                    
                    $scope.tiles = {};
                    $scope.tiles.near = {
                        center: $scope.map[position.y][position.x], 
                    };
                    
                    $scope.tiles.far = {};
                    
                    switch (direction) {
                        case 'N':
                            $scope.tiles.far.center = $scope.map[position.y-1][position.x];
                            $scope.tiles.far.left = $scope.map[position.y-1][position.x-1];
                            $scope.tiles.far.right = $scope.map[position.y-1][position.x+1];
                            
                            $scope.tiles.near.left = $scope.map[position.y][position.x-1];
                            $scope.tiles.near.right = $scope.map[position.y][position.x+1];
                            break;
                            
                        case 'S':
                            $scope.tiles.far.center = $scope.map[position.y+1][position.x];
                            $scope.tiles.far.left = $scope.map[position.y+1][position.x+1];
                            $scope.tiles.far.right = $scope.map[position.y+1][position.x-1];
                            
                            $scope.tiles.near.left = $scope.map[position.y][position.x+1];
                            $scope.tiles.near.right = $scope.map[position.y][position.x-1];
                            break;
                            
                        case 'E':
                            $scope.tiles.far.center = $scope.map[position.y][position.x+1];
                            $scope.tiles.far.left = $scope.map[position.y-1][position.x+1];
                            $scope.tiles.far.right = $scope.map[position.y+1][position.x+1];
                            
                            $scope.tiles.near.left = $scope.map[position.y-1][position.x];
                            $scope.tiles.near.right = $scope.map[position.y+1][position.x];
                            break;
                            
                        case 'W':
                            $scope.tiles.far.center = $scope.map[position.y][position.x-1];
                            $scope.tiles.far.left = $scope.map[position.y-1][position.x-1];
                            $scope.tiles.far.right = $scope.map[position.y+1][position.x-1];
                            
                            $scope.tiles.near.left = $scope.map[position.y+1][position.x];
                            $scope.tiles.near.right = $scope.map[position.y-1][position.x];
                            break;
                    }
                    
                    if (position.x <= MAX_MAP_SIZE.X && position.y <= MAX_MAP_SIZE.Y &&
                        position.x >= 0 && position.y >= 0) {   
                        $scope.map[position.oy][position.ox].status= 1;  
                        $scope.map[position.y][position.x].status = 2;
                          
                        
                        $scope.position.ox = $scope.position.x;
                        $scope.position.oy = $scope.position.y;
                    }else{
                        $scope.position.x = $scope.position.ox;
                        $scope.position.y = $scope.position.oy;                     
                    }
                    console.log($scope.tiles)
                }, true);
                
                $scope.$watch('direction.number', function () {
                    $scope.direction.letter = DIRECTIONS[$scope.direction.number];
                });
                
                $scope.move = function () {
                    var direction = $scope.direction.letter;
                    var newPosition = angular.copy($scope.position);
                    switch (direction) {
                        case 'N':
                            newPosition.y -= 1;
                            break;
                        case 'S':
                            newPosition.y += 1;
                            break;
                        case 'E':
                            newPosition.x += 1;
                            break;
                        case 'W':
                            newPosition.x -= 1;  
                            break;
                    }
                    
                    var tile = $scope.map[newPosition.y][newPosition.x];
                    if (!tile.solid) {
                        $scope.position = newPosition;
                    }else{
                        console.log("Can't move into a wall bro");
                    }
                };
                
                // Movement controls
                key('up', 'Travel', function(){
                    apply($scope, function () {
                        $scope.move();
                    });
                });
                
                key('left', 'Travel', function(){
                    apply($scope, function () {
                        $scope.direction.number = $scope.direction.number > 0? ($scope.direction.number-1) % 4 : 3;
                    });
                });
                
                key('right', 'Travel', function(){
                    apply($scope, function () {
                        $scope.direction.number = ($scope.direction.number+1) % 4;
                    });
                });                
                
                // Item user controls
                key('a', 'Travel', function(){
                    apply($scope, function () {
                        $scope.text = "Use item 1.";
                    });
                });
                
                key('s', 'Travel', function(){
                    apply($scope, function () {
                        $scope.text = "Use item 2.";
                    });
                });
                
                key('d', 'Travel', function(){
                    apply($scope, function () {
                        $scope.text = "Use item 3.";
                    });
                });
                
                // Item describe controls
                key('shift + a', 'Travel', function(){
                    apply($scope, function () {
                        $scope.text = "This is an axe, used for chopping and the like";
                    });
                });
                
                key('shift + s', 'Travel', function(){
                    apply($scope, function () {
                        $scope.text = "This is a crown, makes you look royal, eh?";
                    });
                });
                
                key('shift + d', 'Travel', function(){
                    apply($scope, function () {
                        $scope.text = "Nothing in slot \"C\"";
                    });
                });
                
                key.setScope('Travel');
            });
            
            Game.controller('Combat', function($scope, $timeout) {
                $scope.ready = false;
                $scope.rate = 50;
                $scope.width = 184;
                
                $scope.$watch('selector', function () {
                    if ($scope.selector >= $scope.width || $scope.selector <= 0) {   
                        $scope.switchTurn();
                    }
                });
                
                // Combat controls
                key('z', 'Combat', function(){
                    apply($scope, function () {
                        var action = {
                            type: 'attack',
                            position: $scope.selector
                        };
                        $scope.actions.push(action);
                        $scope.bar.push(action);
                    });
                });
                
                key('x', 'Combat', function(){
                    apply($scope, function () {
                        var action = {
                            type: 'defend',
                            position: $scope.selector
                        };
                        $scope.actions.push(action);
                        $scope.bar.push(action);
                    });
                });
                
                $scope.begin = function (enemy) {
                    $scope.enemy = {
                        attack: 5, 
                        defend: 5,
                        likelihoodOf: {
                            attack: 0.75,
                            defend: 0.5 
                        },
                        precision: 0.3
                    };
                    $scope.turn = "enemy";
                };
                
                $scope.$watch('turn', function () {
                    if (!$scope.turn || !$scope.enemy) return;
                    
                    $scope.actions = [];
                    
                    if ($scope.turn == "enemy") {
                        key.setScope('None');
                        $scope.bar = [];
                        $scope.step = -4;
                        $scope.selector = $scope.width-1;
                        
                        var addDelayedAction = function (type, delay, owner) {
                            $timeout(function () {
                                var action = {
                                    type: type,
                                    position: $scope.width-(delay/$scope.rate)*Math.abs($scope.step),
                                    owner: owner
                                };
                                $scope.actions.push(action);
                                $scope.bar.push(action);
                            }, delay);   
                        }
                        
                        var addEnemyActions = function (type) {
                            for (var attack = 1; attack <= $scope.enemy[type]; attack++) {
                                var acts = Math.random() <= $scope.enemy.likelihoodOf[type];
                                if (acts) {
                                    var isValid = false;
                                    var trys = 0;
                                    var delay
                                    while (!isValid && trys <= 3) {
                                        delay = Math.random()*maxDelay;
                                        trys += 1;
                                        delay = (delay-(delay % 200))
                                        if (!delays[delay]) {
                                             delays[delay] = true,
                                             isValid = true;
                                        }
                                        addDelayedAction(type, delay, 'enemy');
                                    }
                                }
                            }
                        }
                        
                        var maxDelay = $scope.rate*($scope.width/Math.abs($scope.step));
                        var delays = {};
                        
                        addEnemyActions('attack');
                        addEnemyActions('defend');
                        
                    }else{
                        key.setScope('Combat');   
                        $scope.step = 4;
                        $scope.selector = 1;
                    }
                    $scope.ready = true;
                });
                
                $scope.switchTurn = function () {
                    $scope.turn = $scope.turn == "enemy"? "player": "enemy";
                }
                
                key.setScope('Combat');
                
                $scope.$on('destroy', function () {
                    key.setScope('Travel');
                });
            });

            Game.directive('letter', [function () {
                return {
                    link: function (scope, elem, attrs, ctrl) {
                        var width = attrs.large? 16:8;
                        attrs.$observe('letter', function () {
                            var letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#%&@$.,!?:;'\"()[]*/\\+-<=> ";
                            var letterPosition = -letters.indexOf(attrs.letter)*width;
                            elem.css({
                                "background-position": letterPosition + "px 0px",
                            });
                        });
                    },
                    restrict: 'A'
                };
            }]);

            Game.directive('combat', function () {
                return {
                    controller: 'Combat',
                    link: function (scope, elem, attrs) {
                        attrs.$observe('combat', function () {
                            scope.begin(attrs.combat);
                        });
                    }
                };
            });
            
            Game.directive('phrase', [function () {
                return {
                    template: [
                        '<div class="phrase-line" ng-repeat="line in lines track by $index">',
                        '<div class="phrase-letter"',
                        'ng-repeat="letter in line track by $index"',
                        'letter="{{letter}}"></div>',
                        '</div>',
                    ].join('\n'),
                    link: function (scope, elem, attrs, ctrl) {
                        attrs.$observe('phrase', function () {
                            var MAX_LINE_LENGTH = 24;
                            var phrase = attrs.phrase;
                            var words = phrase.split(' ');
                            var lines = [""];
                            
                            angular.forEach(words, function (word) {
                                var line = lines[lines.length-1] || "";
                                if (line.length + word.length <= MAX_LINE_LENGTH) {
                                    line += word + " ";   
                                    lines[lines.length-1] = line;
                                }else{
                                    lines.push(word + " ");
                                }
                            });
                        
                            scope.lines = lines;
                        });
                    },
                    restrict: 'A'
                };
            }]);

            Game.directive('move', ['$timeout', function ($timeout) {
                return {
                    template: '',
                    link: function (scope, elem, attrs, ctrl) {                        
                        var loop = function () {
                            if (attrs.go !== "true") return;
                            $timeout(function () {
                                if (attrs.go === "true") {
                                    scope.selector += parseInt(attrs.step, 10) || 4;
                                    loop();
                                }
                            }, parseInt(attrs.rate, 10) || 100);
                        }
                        
                        attrs.$observe('go', function () {
                            if (attrs.go == "true") {
                                loop();
                            }
                        });
                        
                        scope.$watch('selector', function () {
                            elem.css('left', scope.selector + 'px');
                        });
                    },
                    restrict: 'A'
                };
            }]);
            
            var apply = function ($scope, func) {
                if (!$scope.$$phase) {
                    $scope.$apply(func);
                }else{
                    func();  
                }
            }