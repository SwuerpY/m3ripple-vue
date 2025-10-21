// compression level of sparkles (dispersion level)

class Sparkle {
  xpos: number;
  ypos: number;
  width: number;
  height: number;

  constructor(xpos: number, ypos: number, width: number, height: number) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
  }
}

export class Sparkles {
  sparkles: Sparkle[];
  color: string;

  constructor(sparkles: Sparkle[], color: string) {
    this.sparkles = sparkles;
    this.color = color;
  }
}
type SparklesColor = {
  // base color
  rgb: string;
  // opacity before hide
  opacity_level1: string;
  opacity_level2: string;
};

function calcSparklePositionsWithDegAndWidth(
  deg: number,
  // Divergence level of the sparkle (should be set from the width of the current ripple)
  divergence: number,
  // Sparkle compression level (set freely)
  compLevel: number,
  SparkleRadius: number
) {
  const radian = deg * (Math.PI / 180);
  // cos represents the x-coordinate on the unit circle.
  // The larger cw (ripple radius), the more dispersed we want it -> multiply the random number by cw
  // The larger convLevel (compression level), the more clustered we want it -> divide cw multiplied by the random number
  // We subtract because it only disperses to positive values (outside the circle), so we subtract to also disperse inside the circle.
  const xpos =
    Math.cos(radian) * SparkleRadius +
    (Math.floor(Math.random() * (divergence / compLevel)) -
      Math.floor(Math.random() * (divergence / compLevel)));
  const ypos =
    Math.sin(radian) * SparkleRadius +
    (Math.floor(Math.random() * (divergence / compLevel)) -
      Math.floor(Math.random() * (divergence / compLevel)));
  return { xpos: xpos, ypos: ypos };
}

function calcSparkleColorWithWidth(
  now: number,
  max: number,
  sparklesColor: SparklesColor
) {
  const random_ratio = 0.3;
  const max_opacity = 0.6;
  // Change opacity based on how much of the maximum ripple size the current size represents.
  // As the ripple expands and approaches its maximum size, it becomes more transparent.
  return `rgb(${sparklesColor.rgb} / ${Math.abs(
    (Math.random() - Math.random()) * random_ratio +
      (1 - now / max) -
      (1 - max_opacity)
  ).toFixed(2)})`;
}

export function drawSparkles(
  sparkle_collection: Sparkles[],
  context: CanvasRenderingContext2D,
  ripple: HTMLSpanElement,
  ripple_width: number,
  sparklesColor: SparklesColor = {
    rgb: "255 255 255",
    opacity_level1: "0.2",
    opacity_level2: "0.1",
  },
  // no zero
  convLevel = 6,
  spaklesMaxCount = 2048
): void {
  const nowRippleRadius = ripple.clientWidth / 2;
  const radius = ripple.clientWidth / 2.6;

  context.clearRect(0, 0, ripple_width, ripple_width);

  if (nowRippleRadius === 0 || convLevel === 0) {
    return;
  }

  const sparkles: Sparkle[] = [];

  let sparkleCount = ripple.clientWidth;
  if (sparkleCount > spaklesMaxCount) {
    sparkleCount = spaklesMaxCount;
  }

  // Points on a circle with a constant radius centered at the ripple's origin are uniquely determined once the angle is set
  const sparkleDegs = [];

  // Generate random angles (in degrees) for the number of sparkles (0~360)
  for (let i = 0; i < sparkleCount; i++) {
    sparkleDegs.push(Math.floor(Math.random() * 360));
  }

  for (const deg of sparkleDegs) {
    const pos = calcSparklePositionsWithDegAndWidth(
      deg,
      nowRippleRadius,
      convLevel,
      radius
    );
    sparkles.push(new Sparkle(pos.xpos, pos.ypos, 1, 1));
  }

  const color = calcSparkleColorWithWidth(
    nowRippleRadius,
    ripple_width,
    sparklesColor
  );

  sparkle_collection.push(new Sparkles(sparkles, color));

  // There are multiple sets of currently rendered Sparkles that exist concentrically with different radii based on their existence time
  // If this exceeds 5 (in terms of sparkle count, that's a maximum of sparkleCount * 5 sparkles)
  if (sparkle_collection.length > 5) {
    // Remove one set of sparkles with smaller radius (this keeps it at 5)
    sparkle_collection.splice(0, 1);
    // Make the sparkles about to disappear more transparent
    const firstSparkle = sparkle_collection[0];
    const secondSparkle = sparkle_collection[1];
    if (firstSparkle) {
      firstSparkle.color = `rgb(${sparklesColor.rgb} / ${sparklesColor.opacity_level1})`;
    }
    if (secondSparkle) {
      secondSparkle.color = `rgb(${sparklesColor.rgb} / ${sparklesColor.opacity_level2})`;
    }
  }

  for (const sparkles of sparkle_collection) {
    context.fillStyle = sparkles.color;
    for (const sparkle of sparkles.sparkles) {
      context.fillRect(
        ripple_width / 2 + sparkle.xpos,
        ripple_width / 2 + sparkle.ypos,
        sparkle.width,
        sparkle.height
      );
    }
  }
}
