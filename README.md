# thundra-test-init-action

A GitHub Action to set proper outputs before running Thundra test run actions when using a **build matrix**.

## Usage

Information about the available outputs is listed [below](#outputs).

Since in a matrix build, jobs doesn't share environment variables and it isn't quite possible to match the builds using what GitHub Action gives as context at the moment, we're setting a unique key to be used in the matrix.

An example usage would be running this action in a job and depend another job to this one.

```yaml
# ...

jobs:
  thundra_test_initializer:
    runs-on: ubuntu-latest
    outputs:
      thundra_agent_testrun_id: ${{ steps.thundra_test_initializer.outputs.thundra_agent_testrun_id }}
    steps:
      - uses: actions/checkout@v2
      - id: thundra_test_initializer  # This ID can be anything. Must match the path for the output variable
        uses: thundra-io/thundra-test-init-action@v1

  build_matrix:
    runs-on: ubuntu-latest
    needs: thundra_test_initializer   # Required to add the job dependency
    env:                              # Set the environment variable for all the steps
      THUNDRA_AGENT_TEST_RUN_ID: ${{ needs.thundra_test_initializer.outputs.thundra_agent_testrun_id }}
    strategy:
      matrix:
        # ...
        # Your matrix
    steps:
      # ...
      # Your steps
```

## Outputs

| Name                          | Value                 | Description
| ---                           | ---                   | ---
| thundra_agent_testrun_id      | Random Bytes          | A random testrun ID to match the runs within a matrix build. This variable must be set to `THUNDRA_AGENT_TEST_RUN_ID` environment variable.
