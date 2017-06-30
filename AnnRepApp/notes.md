## DEVISE

This is what's in the devise model.

```
User(id: integer, email: string, encrypted_password: string, reset_password_token: string, reset_password_sent_at: datetime, remember_created_at: datetime, sign_in_count: integer, current_sign_in_at: datetime, last_sign_in_at: datetime, current_sign_in_ip: inet, last_sign_in_ip: inet, created_at: datetime, updated_at: datetime)
```


### EXCESS CODE FROM REPORTINDEX

```
<p>{this.state.report.header_colour}</p>

<h3>
  Hello, {this.state.name}!
</h3>
<div>
  <h2>Please Enter a Colour</h2>
  <form ref={(input) => this.resetForm = input} onSubmit={(e) => this.updateObject(e)}>
     <input ref={(input) => this.backgroundcolor = input} type="text" placeholder="Enter Colour" />
     <button type="submit">+ Add Item</button>
 </form>
</div>

<form >
  <label htmlFor="name">
    Say hello to:
  </label>
  <input
    id="name"
    type="text"
    value={this.state.name}
    onChange={(e) => this.updateName(e.target.value)}
  />
</form>
```
