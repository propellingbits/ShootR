/// <reference path="../../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Ship.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShootR;
(function (ShootR) {
    var ShipLifeGraphic = (function (_super) {
        __extends(ShipLifeGraphic, _super);
        function ShipLifeGraphic(lifeController) {
            var _this = this;
            var width = ShootR.Ship.SIZE.Width * ShipLifeGraphic.SHIP_WIDTH_PARTIAL;

            _super.call(this, 0, ShootR.Ship.SIZE.HalfHeight + ShipLifeGraphic.SHIP_Y_OFFSET, width, ShipLifeGraphic.HEIGHT, ShipLifeGraphic.BACKGROUND_COLOR);

            this._lifeController = lifeController;

            this.Border(1, ShipLifeGraphic.BORDER_COLOR);

            this._overlay = new eg.Graphics.Rectangle(0, 0, width, ShipLifeGraphic.HEIGHT, this.OverlayColor());

            this._lifeController.OnLifeChange.Bind(function (health, maxLife) {
                var healthPercentage = health / maxLife;

                _this._overlay.Color = _this.OverlayColor();
                _this._overlay.Size.Width = healthPercentage * (width);
                _this._overlay.Position.X = -(width - _this._overlay.Size.Width) * .5;
            });

            this.AddChild(this._overlay);
        }
        ShipLifeGraphic.prototype.OverlayColor = function () {
            var healthPercentage = this._lifeController.HealthPercent;

            if (healthPercentage <= ShootR.ShipLifeController.BAD_THRESHOLD) {
                return ShootR.ShipLifeController.BAD_COLOR;
            } else if (healthPercentage <= ShootR.ShipLifeController.HURT_THRESHOLD) {
                return ShootR.ShipLifeController.HURT_COLOR;
            } else {
                return ShootR.ShipLifeController.GOOD_COLOR;
            }
        };
        ShipLifeGraphic.BACKGROUND_COLOR = eg.Graphics.Color.FromHex("7F767D");
        ShipLifeGraphic.BORDER_COLOR = eg.Graphics.Color.Black;
        ShipLifeGraphic.SHIP_Y_OFFSET = 15;
        ShipLifeGraphic.SHIP_WIDTH_PARTIAL = .8;
        ShipLifeGraphic.HEIGHT = 5;
        return ShipLifeGraphic;
    })(eg.Graphics.Rectangle);
    ShootR.ShipLifeGraphic = ShipLifeGraphic;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ShipLifeGraphic.js.map