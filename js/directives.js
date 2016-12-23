'use strict';

/* Directives */

angular.module('fuselageMaker.directives', [])
  .directive('oldDraggable', ['$document', function($document) {
  return {
    link: function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;

      element.css({
       position: 'relative',
       cursor: 'pointer'
      });

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        var point = scope.get_scaled_point(event.clientX, event.clientY);
        startX = point.x;
        startY = point.y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {   
        var point = scope.get_scaled_point(event.clientX, event.clientY);
        x = point.x;
        y = point.x;

        element.css({
          top:  y + 'px',
          left: x + 'px'
        });
        scope.sst2.dragX = x;
        scope.sst2.dragY = y;
        scope.draggify(attr.dragType, attr.dragObj, attr.dragIndex);
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }  
  }
}]).directive('draggable', ['$document', function($document) {
    return {
      link: function(scope, element, attr) {
        var startX = 0, startY = 0, x = 0, y = 0, x0 = 0, y0 = 0;

        element.css({
         position: 'relative',
         cursor: 'pointer'
        });

        element.on('mousedown', function(event) {
          // Prevent default dragging of selected content
          event.preventDefault();
          var point = scope.get_scaled_point(event.clientX, event.clientY);
          startX = point.x;
          startY = point.y;
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
          scope.sst2.is_drag = true
          // Prepare for any type of dragging the app will possibly do here.  This preps scope.draggify
          if (attr.dragObj === "sbobc") {
            scope.sst2.drobj1 = scope.sst.side.bottom_outline[attr.dragIndex][attr.dragSubEl];
          } else if (attr.dragObj === "stobc") {
            scope.sst2.drobj1 = scope.sst.side.top_outline[attr.dragIndex][attr.dragSubEl];
          } else if (attr.dragObj === "trobc") {
            scope.sst2.drobj1 = scope.sst.top.right_outline[attr.dragIndex][attr.dragSubEl];
          } else if (attr.dragObj === "tlobc") {
            scope.sst2.drobj1 = scope.sst.top.left_outline[attr.dragIndex][attr.dragSubEl];
          }else if (attr.dragObj === "xobc") {
            scope.sst2.drobj1 = scope.sst.xsecs[attr.dragIndexParent].xsec[attr.dragIndex][attr.dragSubEl];
          } else if (attr.dragObj === "sbod" && attr.dragIsBezier) { 
            scope.sst2.drobj1 = scope.sst.side.bottom_outline[attr.dragIndex];
            scope.sst2.drobj2 = scope.sst.side.bottom_outline[attr.dragIndex].c;
            if (attr.dragIndex < scope.sst.side.bottom_outline.length) {
              scope.sst2.drobj3 = scope.sst.side.bottom_outline[attr.dragIndex+1];
              if (scope.sst2.drobj2 = scope.sst.side.bottom_outline[attr.dragIndex+1].is_bezier) {
                scope.sst2.drobj4 = scope.sst.side.bottom_outline[attr.dragIndex+1].c;
              }
            }
          }       
        });

        function mousemove(event) {
          if (!attr) {
            alert ('attr is NOT defined:' + attr);
          } else {
            //alert(attr);
          }
          var point = scope.get_scaled_point(event.clientX, event.clientY);
          x = point.x;
          y = point.y;
          element.css({
            top:  y + 'px',
            left: x + 'px'
          });
          //console.log(element.css('transform'));
          console.log('x='+x+', y='+y);
          scope.draggify(x, y, attr.dragIndex, scope.sst2.drobj1, scope.sst2.drobj2, 
                                                 scope.sst2.drobj3, scope.sst2.drobj4);
        }

        function mouseup() {
          $document.off('mousemove', mousemove);
          $document.off('mouseup', mouseup);
        }
      }
    };
  }]);
