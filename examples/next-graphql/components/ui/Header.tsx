export default function Header() {

  // @todo: Fetch menusItems from Drupal
  const menus = [
    {
      id: 1,
      url: "/",
      title: "home",
    },
    {
      id: 2,
      url: "/blog",
      title: "blog",
    },
    {
      id: 3,
      url: "/contact",
      title: "contact",
    },
  ]

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <span>{ }</span>
      <div className="text-center md:text-left text-lg mt-5 md:pl-8">
        <ul className="flex">
          {menus && menus?.map(function (item) {
            return (<li key={item.id} className="mr-6"><a href={item.url}>{item.title}</a></li>)
          })}
        </ul>
      </div>
    </section>
  )
}
