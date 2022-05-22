<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of
profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              创建文章
              <div class="editor-page">
                <div class="container page">
                  <div class="row">
                    <div class="col-md-10 offset-md-1 col-xs-12">
                      <form>
                        <fieldset>
                          <fieldset class="form-group">
                            <input
                              type="text"
                              class="form-control form-control-lg"
                              placeholder="Article Title"
                            />
                          </fieldset>
                          <fieldset class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="What's this
article about?"
                            />
                          </fieldset>
                          <fieldset class="form-group">
                            <textarea
                              class="form-control"
                              rows="8"
                              placeholder="Write your
article (in markdown)"
                            ></textarea>
                          </fieldset>
                          <fieldset class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter
tags"
                            />
                            <div class="tag-list"></div>
                          </fieldset>
                          <button
                            class="btn btn-lg pull-xs-right btn-primary"
                            type="button"
                          >
                            Publish Article
                          </button>
                        </fieldset>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              文章详情
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Setting',
}
</script>

<style></style>
