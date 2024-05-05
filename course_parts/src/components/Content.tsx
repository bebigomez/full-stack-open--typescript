interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface PartsProps {
  name: string;
  exerciseCount: number;
  description?: string;
  groupProjectCount?: number;
  backgroundMaterial?: string;
}

interface ContentProps {
  courseParts: CoursePart[]
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartsProps) => {
  return (
    <>
      <div style={{ marginTop: '15px' }}>
        <strong>{props.name} {props.exerciseCount}</strong>
      </div>
    </>
  )
}

export const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map(part => {
        switch (part.kind) {
          case 'basic':
            return (
              <div key={part.name}>
                <Part name={part.name} exerciseCount={part.exerciseCount} />
                <em style={{ margin: '0px' }}>{part.description}</em>
              </div>
            );
          case 'group':
            return (
              <div key={part.name}>
                <Part name={part.name} exerciseCount={part.exerciseCount} />
                <p style={{ margin: '0px' }}>project exercises {part.groupProjectCount}</p>
              </div>
            );
          case 'background':
            return (
              <div key={part.name}>
                <Part name={part.name} exerciseCount={part.exerciseCount} />
                <em style={{ margin: '0px' }}>{part.description}</em>
                <p style={{ margin: '0px' }}>submit to {part.backgroundMaterial}</p>
              </div>
            );
          case 'special':
            return (
              <div key={part.name}>
                <Part name={part.name} exerciseCount={part.exerciseCount} />
                <em style={{ margin: '0px' }}>{part.description}</em>
                <p style={{ margin: '0px' }}>required skills: {part.requirements.join(', ')}</p>
              </div>
            );
          default:
            return assertNever(part);
        }
      })}
    </>
  );
};
