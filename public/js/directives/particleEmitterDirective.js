angular.module('particleEmitterDirective', []).directive('particleEmitter', function() {
    return {
        restrict: "A",
        link: function(scope, element){
            var ctx = element[0].getContext('2d');

            this.allo = function() {
                console.log("allo");
            };

            this.createProton = function() {
                proton = new Proton();
                emitter = new Proton.Emitter();
                emitter.rate = new Proton.Rate(new Proton.Span(10, 20), new Proton.Span(.1, .25));
                emitter.addInitialize(new Proton.Mass(1));
                emitter.addInitialize(new Proton.Radius(1, 12));
                emitter.addInitialize(new Proton.Life(2, 4));
                emitter.addInitialize(new Proton.Velocity(new Proton.Span(2, 4), new Proton.Span(-30, 30), 'polar'));
                emitter.addBehaviour(new Proton.RandomDrift(30, 30, .05));
                emitter.addBehaviour(new Proton.Color('ff0000', 'random', Infinity, Proton.easeOutQuart));
                emitter.addBehaviour(new Proton.Scale(1, 0.7));
                emitter.p.x = canvas.width / 2;
                emitter.p.y = canvas.height / 2;
                emitter.emit();
                proton.addEmitter(emitter);

                renderer = new Proton.Renderer('canvas', proton, canvas);
                renderer.onProtonUpdate = function() {
                    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                };
                renderer.start();
            };


            this.thick = function() {
                requestAnimationFrame(this.thick);

                emitter.rotation += 1.5;
                proton.update();
            };

            this.createProton();
            this.thick();
        }
    };
});