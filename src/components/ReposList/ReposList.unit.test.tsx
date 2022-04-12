import "@testing-library/jest-dom";
import { render, screen } from "../../testUtils";
import { ReposList, Props } from ".";
import { arrMockUserRepos } from "../../mocks";
import { reposPayloadAdaptor } from "../../utils";
import { OBJ_DATA_TEST_IDS } from "../../constants";

const arrMockRepos = reposPayloadAdaptor(arrMockUserRepos);
const objMockProps: Props = {
  arrRepos: [],
  bLoading: false,
  nStrError: null,
};
const renderNav = (objMocks: Props) => render(<ReposList {...objMocks} />);

describe("RepoList", () => {
  beforeEach(() => {
    jest.spyOn(console, "error");
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });
  afterEach(() => {
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockRestore();
  });

  it("should render the component", () => {
    renderNav(objMockProps);
  });

  it("should render with no data message", () => {
    renderNav(objMockProps);
    const repoListNoData = screen.getByText(
      "Current user does not have any repository. Enter username to search for repos."
    );
    expect(repoListNoData).toBeInTheDocument();
  });

  it("should render the loading message", () => {
    renderNav({ ...objMockProps, bLoading: true });
    const repoListLoading = screen.getByText("Loading repos...");
    expect(repoListLoading).toBeInTheDocument();
  });

  it("should render the error message", () => {
    renderNav({ ...objMockProps, nStrError: "Mock message" });
    const repoListError = screen.getByText(/Error occured: /);
    expect(repoListError).toBeInTheDocument();
  });

  it("should render the repos list items if data exists", () => {
    renderNav({ ...objMockProps, arrRepos: arrMockRepos });
    const repoListItems = screen.getAllByTestId(OBJ_DATA_TEST_IDS.repoListItem);
    expect(repoListItems.length).toEqual(arrMockRepos.length);
  });
});
