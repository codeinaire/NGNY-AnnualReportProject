# ISSUES

### Content section title not updating when updated in menu-section

CONTEXT - `Menu` is a parent component to `EditPart` and `NewPart` while `EditPart` is a parent to `EditSection` and `NewSection`. `NewSection` creates a new Section with a user generated titled under Part and `NewPart` creates a new Part with a user generated title. The title for the part and section appears in the `Content` component from the title entered by the user. The user can edit the title of both Part and Section.

PROBLEM - When the user edits either Part or Section title the title inside `Menu` component updates straight away. However, the title in `Content` doesn't update at the same time.

DETAILS - `Placeholder` contains the state that changes the Part and Section title for `Content`. This doesn't change when the user edits the title in `EditSection` or `EditPart`. However, when the user clicks on the title of either the Part or the Section it will update the both the Part and Section title. This seems to update the state in `Placeholder`
