import { useState, useEffect, Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  ChatAltIcon,
  CodeIcon,
  DotsVerticalIcon,
  EyeIcon,
  FlagIcon,
  PlusIcon,
  SearchIcon,
  ShareIcon,
  StarIcon,
  ThumbUpIcon
} from "@heroicons/react/solid";
import {
  BellIcon,
  FireIcon,
  HomeIcon,
  MenuIcon,
  TrendingUpIcon,
  UserGroupIcon,
  XIcon
} from "@heroicons/react/outline";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { TextField, LinearProgress } from "@material-ui/core";

const toSentence = function (arr) {
  return arr.join(", ").replace(/,\s([^,]+)$/, " and $1");
};

const SubmissionPanel = ({ setQuestions }) => {
  const [question, setQuestion] = useState();
  const [imageURL, setImageURL] = useState();
  const [responseData, setResponseData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleAskQuestion = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://ou264.sse.codesandbox.io/process?" +
          new URLSearchParams({ question, imageURL })
      );
      const responseData = await response.json();
      console.log(responseData);

      const questionObject = {
        body: responseData.gptResponseData.choices[0].text,
        author: {
          name: "Tags: " + toSentence(responseData.labelAnnotationDescriptions),
          imageUrl: imageURL,
          href: "#"
        },
        date: new Date().toDateString(),
        datetime: new Date(),
        title: question,
        id: imageURL,
        likes: "29",
        replies: "11",
        views: "2.7k",
        bestGuess: responseData.bestGuessContext
      };

      setQuestions((questions) => [questionObject, ...questions]);

      setResponseData(responseData);
      setIsLoading(false);
    } catch (e) {
      alert(JSON.stringify(e));
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg mb-4">
      {isLoading && <LinearProgress color="secondary" />}
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Ask a Question
      </h3>
      <div className="mt-2 max-w-xl text-sm text-gray-500">
        <p>Please provide the context image and question prompt below.</p>
      </div>

      <div className="mt-5 flex flex-col ">
        <TextField
          onChange={(e) => setImageURL(e.target.value)}
          id="standard-basic"
          label="Image URL"
        />
        {imageURL && (
          <img
            src={imageURL}
            className="rounded-xl mt-2"
            style={{ width: "150px" }}
            alt="Image to be processed"
          />
        )}
        <TextField
          className="mt-2 mb-4"
          id="standard-basic"
          style={{ marginTop: "10px" }}
          multiline
          rows={4}
          label="Question"
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          style={{ marginTop: "25px" }}
          onClick={handleAskQuestion}
          className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Ask
        </button>
      </div>
    </div>
  );
};

const user = {
  name: "Chelsea Hagon",
  email: "chelseahagon@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
};
const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: true },
  { name: "Other Responses", href: "#", icon: FireIcon, current: false }
  // { name: 'Communities', href: '#', icon: UserGroupIcon, current: false },
  // { name: 'Trending', href: '#', icon: TrendingUpIcon, current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" }
];
const communities = [
  { name: "History", href: "#" },
  { name: "Environmental Science", href: "#" }
  // { name: 'Sports', href: '#' },
  // { name: 'Animals', href: '#' },
  // { name: 'Science', href: '#' },
  // { name: 'Dinosaurs', href: '#' },
  // { name: 'Talents', href: '#' },
  // { name: 'Gaming', href: '#' },
];
const tabs = [
  { name: "Recent", href: "#", current: true },
  { name: "Pre-Generated", href: "#", current: false }
  // { name: 'Most Answers', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [questions, setQuestions] = useState([]);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "fixed inset-0 z-40 overflow-y-auto" : "",
            "bg-white shadow-sm lg:static lg:overflow-y-visible"
          )
        }
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=rose&shade=500"
                      alt="Workflow"
                    />
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <div className="w-full">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <SearchIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                          placeholder="Search"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-900 hover:underline"
                  >
                    Change API Key
                  </a>
                  <a
                    href="#"
                    className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </a>

                  {/* Profile dropdown */}
                  <Menu as="div" className="flex-shrink-0 relative ml-5">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
                          >
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block py-2 px-4 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>

                  <a
                    href="#"
                    className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  >
                    New Post
                  </a>
                </div>
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-900"
                        : "hover:bg-gray-50",
                      "block rounded-md py-2 px-3 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                  {userNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>

      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <nav
              aria-label="Sidebar"
              className="sticky top-4 divide-y divide-gray-300"
            >
              <div className="pb-8 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50",
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </a>
                ))}
              </div>
              <div className="pt-10">
                <p
                  className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  id="communities-headline"
                >
                  Stored Questions by Subject
                </p>
                <div
                  className="mt-3 space-y-2"
                  aria-labelledby="communities-headline"
                >
                  {communities.map((community) => (
                    <a
                      key={community.name}
                      href={community.href}
                      className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                    >
                      <span className="truncate">{community.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
          <main className="lg:col-span-9 xl:col-span-6">
            <div className="px-4 sm:px-0">
              <SubmissionPanel setQuestions={setQuestions} />

              <div className="sm:hidden">
                <label htmlFor="question-tabs" className="sr-only">
                  Select a tab
                </label>
                <select
                  id="question-tabs"
                  className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  defaultValue={tabs.find((tab) => tab.current).name}
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <nav
                  className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
                  aria-label="Tabs"
                >
                  {tabs.map((tab, tabIdx) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      aria-current={tab.current ? "page" : undefined}
                      className={classNames(
                        tab.current
                          ? "text-gray-900"
                          : "text-gray-500 hover:text-gray-700",
                        tabIdx === 0 ? "rounded-l-lg" : "",
                        tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                        "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                      )}
                    >
                      <span>{tab.name}</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          tab.current ? "bg-rose-500" : "bg-transparent",
                          "absolute inset-x-0 bottom-0 h-0.5"
                        )}
                      />
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="mt-4">
              <h1 className="sr-only">Recent questions</h1>
              <ul className="space-y-4">
                {questions?.map((question) => (
                  <li
                    key={question.id}
                    className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg"
                  >
                    <article aria-labelledby={"question-title-" + question.id}>
                      <div>
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={question.author.imageUrl}
                              alt=""
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {question.bestGuess}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              <a
                                href={question.author.href}
                                className="hover:underline"
                              >
                                {question.author.name}
                              </a>
                            </p>
                            <p className="text-sm text-gray-500">
                              <a
                                href={question.href}
                                className="hover:underline"
                              >
                                <time dateTime={question.datetime}>
                                  {question.date}
                                </time>
                              </a>
                            </p>
                          </div>
                          <div className="flex-shrink-0 self-center flex">
                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              {({ open }) => (
                                <>
                                  <div>
                                    <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                                      <span className="sr-only">
                                        Open options
                                      </span>
                                      <DotsVerticalIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </Menu.Button>
                                  </div>

                                  <Transition
                                    show={open}
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  >
                                    <Menu.Items
                                      static
                                      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                      <div className="py-1">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <a
                                              href="#"
                                              className={classNames(
                                                active
                                                  ? "bg-gray-100 text-gray-900"
                                                  : "text-gray-700",
                                                "flex px-4 py-2 text-sm"
                                              )}
                                            >
                                              <StarIcon
                                                className="mr-3 h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                              />
                                              <span>Add to favorites</span>
                                            </a>
                                          )}
                                        </Menu.Item>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <a
                                              href="#"
                                              className={classNames(
                                                active
                                                  ? "bg-gray-100 text-gray-900"
                                                  : "text-gray-700",
                                                "flex px-4 py-2 text-sm"
                                              )}
                                            >
                                              <CodeIcon
                                                className="mr-3 h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                              />
                                              <span>Embed</span>
                                            </a>
                                          )}
                                        </Menu.Item>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <a
                                              href="#"
                                              className={classNames(
                                                active
                                                  ? "bg-gray-100 text-gray-900"
                                                  : "text-gray-700",
                                                "flex px-4 py-2 text-sm"
                                              )}
                                            >
                                              <FlagIcon
                                                className="mr-3 h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                              />
                                              <span>Report content</span>
                                            </a>
                                          )}
                                        </Menu.Item>
                                      </div>
                                    </Menu.Items>
                                  </Transition>
                                </>
                              )}
                            </Menu>
                          </div>
                        </div>
                        <h2
                          id={"question-title-" + question.id}
                          className="mt-4 text-base font-medium text-gray-900"
                        >
                          {question.title}
                        </h2>
                      </div>
                      <div
                        className="mt-2 text-sm text-gray-700 space-y-4"
                        dangerouslySetInnerHTML={{ __html: question.body }}
                      />
                      <div className="mt-6 flex justify-between space-x-8">
                        <div className="flex space-x-6">
                          <span className="inline-flex items-center text-sm">
                            <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <ThumbUpIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                              <span className="font-medium text-gray-900">
                                {question.likes}
                              </span>
                              <span className="sr-only">likes</span>
                            </button>
                          </span>
                          <span className="inline-flex items-center text-sm">
                            <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <ChatAltIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                              <span className="font-medium text-gray-900">
                                {question.replies}
                              </span>
                              <span className="sr-only">replies</span>
                            </button>
                          </span>
                          <span className="inline-flex items-center text-sm">
                            <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <EyeIcon className="h-5 w-5" aria-hidden="true" />
                              <span className="font-medium text-gray-900">
                                {question.views}
                              </span>
                              <span className="sr-only">views</span>
                            </button>
                          </span>
                        </div>
                        <div className="flex text-sm">
                          <span className="inline-flex items-center text-sm">
                            <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <ShareIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                              <span className="font-medium text-gray-900">
                                Share
                              </span>
                            </button>
                          </span>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </main>
          <aside className="hidden xl:block xl:col-span-4">
            <div className="sticky top-4 space-y-4">
              <section aria-labelledby="who-to-follow-heading">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6">
                    <h2
                      id="who-to-follow-heading"
                      className="text-base font-medium text-gray-900"
                    >
                      Parameters
                    </h2>
                    <div className="mt-6 flow-root">
                      <ul className="-my-4 divide-y divide-gray-200">
                        <Typography id="discrete-slider" gutterBottom>
                          Temperature
                        </Typography>
                        <Slider
                          defaultValue={30}
                          valueLabelDisplay="auto"
                          step={10}
                          marks
                          min={10}
                          max={110}
                        />
                        <Typography id="discrete-slider" gutterBottom>
                          Top P
                        </Typography>
                        <Slider
                          defaultValue={20}
                          valueLabelDisplay="auto"
                          step={10}
                          marks
                          min={10}
                          max={110}
                        />
                        <Typography id="discrete-slider" gutterBottom>
                          Frequency Penalty
                        </Typography>
                        <Slider
                          defaultValue={50}
                          valueLabelDisplay="auto"
                          step={10}
                          marks
                          min={10}
                          max={110}
                        />
                        <Typography id="discrete-slider" gutterBottom>
                          Presence Penalty
                        </Typography>
                        <Slider
                          defaultValue={30}
                          valueLabelDisplay="auto"
                          step={10}
                          marks
                          min={10}
                          max={110}
                        />
                        <Typography id="discrete-slider" gutterBottom>
                          Best of
                        </Typography>
                        <Slider
                          defaultValue={30}
                          aria-labelledby="discrete-slider"
                          valueLabelDisplay="auto"
                          step={10}
                          marks
                          min={10}
                          max={110}
                          disabled
                        />
                      </ul>
                    </div>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Set
                      </a>
                    </div>
                  </div>
                </div>
              </section>
              <section aria-labelledby="trending-heading">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6">
                    <h2
                      id="trending-heading"
                      className="text-base font-medium text-gray-900"
                    >
                      Engine
                    </h2>
                    <div className="mt-6 flow-root">
                      <ul className="-my-4 divide-y divide-gray-200">
                        Using engine: Davinci
                      </ul>
                    </div>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Change Engine
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
